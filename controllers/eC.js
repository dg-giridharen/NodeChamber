const d = {
  e: require("../models/employees.json"),
  sE : function(d) {this.e = d}
};

const cE = (r, s) => {
  const nE = {
    _id: d.e[d.e.length-1]._id+1 || 1,
    f : r.body.firstname,
    l : r.body.lastname
  }
  if(!nE.f || !nE.l)
    return s.status(400).json({"message":"First name and last name required"})
  d.sE([...d.e,nE])
  s.status(201).json(d.e)
};

const uE = (r, s) => {
    const e = d.e.find(emp=>emp._id===parseInt(r.body.id))
    if(!e)
      return s.status(400).json({"message":`Emp id ${r.body.id} not found`})

    if(r.body.firstname) e.f = r.body.firstname
    if(r.body.lastname) e.l = r.body.lastname

    const fA = d.e.filter(
      emp => emp._id!==parseInt(r.body.id)
    )

    const uA = [...fA,e]
    d.sE(uA.sort((a,b)=>a._id>b._id?1:-1))
    s.json(d.e)
};

const dE = (r, s) => {
  const e = d.e.find(emp=>emp._id===parseInt(r.body.id))
    if(!e)
      return s.status(400).json({"message":`Emp id ${r.body.id} not found`})

    const fA = d.e.filter(
      emp => emp._id!==parseInt(r.body.id)
    )

    d.sE([...fA])
    s.json(d.e)
};

const gAE = (r, s) => {  
  s.json(d.e);
};

const gE = (r, s) => {
  const e = d.e.find(emp=>emp._id===parseInt(r.params.id))
  if(!e)
      return s.status(400).json({"message":`Emp id ${r.params.id} not found`})
  s.json(e)
};

module.exports = {
  gAE,
  gE,
  uE,
  cE,
  dE,
};
