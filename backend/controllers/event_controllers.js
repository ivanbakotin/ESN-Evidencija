const pool = require("../db.js");

exports.get_events = async function(req, res, next) {}

exports.get_eventdetails = async function(req, res ,next) {
    const result = await pool.query(`SELECT e.*, json_agg(c.*) FROM eventi AS e
                                        LEFT JOIN clanovi AS c
                                            ON c.id = ANY(dolasci)
                                     WHERE e.id=$1
                                     GROUP BY e.id
                                     `, [req.body.id])
    result.rows[0].datum = result.rows[0].datum.toISOString().substring(0,10)
    return res.status(200).json(result.rows[0])
}

exports.get_eventform = async function(req, res ,next) {
    const result = await pool.query(`SELECT * FROM eventi
                                     WHERE id=$1
                                     `, [req.body.id])

    result.rows[0].datum = result.rows[0].datum.toISOString().substring(0,10)                                    
    return res.status(200).json(result.rows[0])
}


exports.create_event = async function(req, res, next) {

    const { ime_eventa, ime_organizatora, datum, cijena, tim } = req.body[0]
    const clanovi = req.body[1]

    pool.query(`INSERT INTO eventi (ime_eventa, ime_organizatora, datum, cijena, tim, dolasci) 
                                     VALUES ($1, $2, $3, $4, $5, $6)`, 
                                    [ime_eventa, ime_organizatora, datum, cijena, tim, clanovi])

    return res.status(200).json()
}

exports.update_event = function(req, res, next) {  
    const { ime_eventa, ime_organizatora, datum, cijena, tim, id } = req.body[0]
    const clanovi = req.body[1]

    pool.query(`UPDATE eventi 
                SET ime_eventa=$1, ime_organizatora=$2, datum=$3, cijena=$4, tim=$5, dolasci=$6
                WHERE id=$7`, 
                [ime_eventa, ime_organizatora, datum, cijena, tim, clanovi, id])

    return res.status(200).json()
}

exports.delete_event = function(req, res, next) {
    pool.query("DELETE FROM dolasci WHERE event_id=$1", [req.body.event_id], function (err, result) {
        pool.query("DELETE FROM eventi WHERE id=$1", [req.body.event_id])
    })
    return res.status(200).json()
}
