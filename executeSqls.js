
const database = require("../services/database.js");
const oracledb = require("oracledb");

const logSQL = props => {
  console.log('******************************')
  console.log(props)
  console.log('******************************')
} 

  async function weakSqls(req, res, next) {
    console.log("START","weakSqls");
    try {
    let query = "select * from products";

    const binds = {};

    if (req.params.id) {
      binds.employee_id = req.params.id;
      query += `\nwhere id = :id`;
    }

    const result = await database.simpleExecute(query, binds);
    res.status(200).json(result);
    } 
    catch (err) {
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("Successfully exected - weakSqls");
    }
  }



module.exports.weakSqls = weakSqls;



async function adhocSqls(req, res, next) {
  console.log("START",`adhocSqls\n`);
  let query;

  try {

  const binds = {};

  if (req.params.sqltext) {
      query = req.params.sqltext;
  }
  else {
    res.status(201).json("SQL is missing in API call");
  }

  const result = await database.simpleExecute(query, binds);
  res.status(200).json(result);
  } 
  catch (err) {
    next(err);
    console.log(`Error while executing the SQL`);
    logSQL(query);
    res.status(400).end();
  }
  finally {
    console.log("END - adhocSqls");
  }
}

async function adhocSqlsViaPost(req, res, next) {
  console.log("START","adhocSqlsViaPost");
  let query;

  try {

  const binds = {};

  if (req.body.sqltext) {
      query = req.params.sqltext;
  }
  else {
    res.status(201).json("SQL text is missing in API call");
  }

  const result = await database.simpleExecute(query, binds);
  console.log(result);
  res.status(200).json(result);
  } 
  catch (err) {
    next(err);
    console.log(`Error while executing the SQL\n ${query}`);
    res.status(400).end();
  }
  finally {
    console.log("END - adhocSqlsViaPost");
  }
}



module.exports.adhocSqls = adhocSqls;


async function executeProc(req, res, next) {
  console.log("START","executeProc");
  var seq;

  //Get seq_id
  try {
    let query = "select orders_seq.nextval seqid from dual";
    const binds = {};

    const result = await database.simpleExecute(query, binds);
    seq = result.rows[0].SEQID;
    console.log("Successfully got the order SEQ_ID - executeProc");
    } 
    catch (err) {
      console.log("Error while getting SEQ_ID\n");
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("END - Get SEQ_ID\n");
    }
  
  try {
  let query = `call pkg_orders.create_order(${seq},'whenkii@yahoo.co.in',:id,:QTY,:PRICE,:p_error_string)`;
  
  // console.log("STATE",req.body);

  const options = {bindDefs: {ID             : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              QTY            : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              PRICE          : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              p_error_string : {type: oracledb.STRING,dir: oracledb.BIND_OUT,maxSize: 500 }
                  }}

  const binds = req.body;

  const result = await database.ExecuteMany_proc(query, binds,options);
                res.status(200).json(result);
  } 
  catch (err) {
    next(err);
    res.status(400).end();
  }
  finally {
    console.log("Successfully executed - executeProc");
  }
}

module.exports.executeProc = executeProc;



async function executeProc_log_order(req, res, next) {
  console.log("START","executeProc_log_order\n");
  var seq;

  //Get seq_id
  try {
    let query = "select orders_seq.nextval seqid from dual";
    const binds = {};

    const result = await database.simpleExecute(query, binds);
    seq = result.rows[0].SEQID;
    // console.log(result.rows[0].SEQID);
    } 
    catch (err) {
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("Successfully got the order SEQ_ID - executeProc");
    }
  
  try {
  let script = `call pkg_orders.create_order(${seq},'whenkii@yahoo.co.in',:id,:QTY,:PRICE,:p_error_string)`;
  
  // console.log("STATE",req.body);

  const options = {bindDefs: {ID             : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              QTY            : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              PRICE          : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              p_error_string : {type: oracledb.STRING,dir: oracledb.BIND_OUT,maxSize: 500 }
                  }}

  const binds = req.body;

  conn = await oracledb.getConnection();
  const result = await conn.executeMany(script, binds, options);
  console.log(result)
  let {outBinds} = result;
  let errorArray = outBinds.map(item => item.p_error_string);
  let lengthOferrorArray = errorArray.filter(a => a && a.length > 0).length;

  console.log("outBinds",errorArray.filter(a => a && a.length > 0));
// If any errors send unsuccessful exit code 201
  if ( lengthOferrorArray > 0 ) {
    console.log("Error while executing the proc -  executeProc_log_order. Transactions is being rolledback");
    console.log("Error ARRAY in executeProc_log_order\n",errorArray)
        await conn.rollback();
        res.status(201).json(result);
      }
  else {
        console.log("Successful execution -  executeProc_log_order. Transactions is comitted");
        await conn.commit();
        res.status(200).json(result);
       } 
     }
  catch (err) {
    next(err);
    console.log("Failed - executeProc_log_order" + err);
    res.status(400).end();
  }
  finally {
    console.log("END","executeProc_log_order");
    await conn.close();
  }
}

module.exports.executeProc_log_order = executeProc_log_order;




