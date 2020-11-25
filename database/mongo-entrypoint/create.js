db.createUser({
  user: "admin",
  pwd: "1234",
  roles: [{ role: "readWrite", db: "sisselogrubenshandleliste" }],
});
db.sisselogrubenshandleliste.insert({ _id: 0 });
