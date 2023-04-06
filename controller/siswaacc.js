import { executeQuery } from "../config/db";
import akunSiswaValidation from "../common/accsiswa";
import ErrorHandler from "../common/errorHandler";



const getAccSiswa = async (req, res, next) => {
    let id = req.query.id;
    try {
      console.log("Siswa by id");
      let siswaData = await executeQuery(
        `select * from akunsiswa where id=?`,
        [id]
      );
      if (siswaData.length > 0) res.status(200).json(siswaData);
      else {
        next(new ErrorHandler(`no siswa found with this id ${id}`, 404));
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

const saveAccSiswa = async (req, res) => {
    try {
      const result = req.body;
      const { nama, email, password} = result;
      let { error } = akunSiswaValidation(result);
      if (error) {
        res.status(400).json(error.details[0].message);
      } else {
        console.log("post request");
        let siswaData = await executeQuery(
          "insert into akunsiswa(nama,email,password) values(?,?,?,?)",
          [nama, email, password]
        );
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };
  export {saveAccSiswa,
            getAccSiswa
};