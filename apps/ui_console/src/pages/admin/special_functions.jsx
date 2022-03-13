import React from "react";
import { getFirestore, collection, getDocs, writeBatch, doc, updateDoc } from "firebase/firestore";
import moment from "moment";

const SpecialFunctions = () => {
  const handleAddNames2Vac = async () => {
    const db = getFirestore();

    const hcpDocs = {};
    const hcps = await getDocs(collection(db, "/organizations/p2p/healthcare_professionals"));
    hcps.forEach((doc) => {
      hcpDocs[doc.id] = {
        id: doc.id,
        ...doc.data(),
      };
    });

    //
    const patientDocs = {};
    const patients = await getDocs(collection(db, "/organizations/p2p/patients"));
    patients.forEach((doc) => {
      patientDocs[doc.id] = {
        id: doc.id,
        ...doc.data(),
      };
    });

    const vacDocs = [];
    const vacs = await getDocs(collection(db, "/organizations/p2p/vaccinations"));
    vacs.forEach((doc) => {
      vacDocs.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(vacDocs.length);

    const newVacs = [];

    vacDocs.forEach((doc) => {
      if (doc.PatientName && doc.HCPName) return;

      let update = false;
      if (hcpDocs[doc.HCPId] != undefined) {
        const hcp = hcpDocs[doc.HCPId];
        if (hcp.Name && hcp.Name.length > 0) doc.HCPName = hcp.Name;
        update = true;
      }

      if (patientDocs[doc.PatientId] != undefined) {
        const patient = patientDocs[doc.PatientId];
        if (patient.Name && patient.Name.length > 0) doc.PatientName = patient.Name;
        update = true;
      }

      if (update) {
        newVacs.push({ ...doc });
      }
    });

    //Dpu6yC5GRQ4ln1fmfO1q
    if (newVacs.length > 0) {
      console.log(newVacs.length);
      const batch = writeBatch(db);

      let count = 150;
      for (let i = 0; i < newVacs.length; i++) {
        let tmpVac = newVacs[i];
        console.log(tmpVac.id);
        const docRef = doc(db, "/organizations/p2p/vaccinations", tmpVac.id);
        const newData = {
          PatientName: tmpVac.PatientName ? tmpVac.PatientName : "",
          HCPName: tmpVac.HCPName ? tmpVac.HCPName : "",
        };
        console.log(newData);
        batch.update(docRef, newData);
        count--;
        if (count <= 0) break;
      }

      await batch.commit();
    }
  };

  const handlePatientExtraData = async () => {
    const db = getFirestore();

    console.log("Get Patients");
    const patientDocs = [];
    const patients = await getDocs(collection(db, "/organizations/p2p/patients"));
    patients.forEach((doc) => {
      patientDocs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log("Get Vaccines");
    const vacDocs = [];
    const vacs = await getDocs(collection(db, "/organizations/p2p/vaccinations"));
    vacs.forEach((doc) => {
      vacDocs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    for (let i = 0; i < patientDocs.length; i++) {
      const p = patientDocs[i];

      if (p.BirthdayOfYear) continue;

      try {
        var pvacs = vacDocs.filter((v) => v.PatientId === p.id);
        pvacs.sort((a, b) => {
          if (a.Time.toDate() < b.Time.toDate()) return -1;
          if (a.Time.toDate() > b.Time.toDate()) return 1;
          return 0;
        });

        let newFields = {};
        newFields.Doses = pvacs.length;
        if (!p.UserId) {
          newFields.UserId = "p7utTjlilmZ6ZH3mrtLJiysx7yW2";
          newFields.UserName = "admin";
        }
        if (pvacs.length > 0) {
          newFields.CreateAt = pvacs[0].Time;
          newFields.UpdateAt = pvacs[0].Time;
          newFields.LastDoseAt = pvacs[pvacs.length - 1].Time;
        } else {
          let startDate = moment();
          startDate.set("month", 9);
          startDate.set("date", 17);
          startDate.set("hour", 9);
          startDate.set("minute", 0);
          startDate.set("second", 0);
          startDate.set("millisecond", 0);
          newFields.CreateAt = startDate.toDate();
          newFields.UpdateAt = startDate.toDate();
        }

        const dob = moment(p.DOB.toDate());
        newFields.BirthdayOfYear = dob.dayOfYear();

        //console.log(newFields);

        const patientRef = doc(db, "/organizations/p2p/patients", p.id);
        await updateDoc(patientRef, newFields);
        console.log(`${p.id} done - ${i}`);
      } catch (err) {
        console.log(err);
        console.log("err : ", p.id);
      }
    }
  };

  const handlePatientCreateTimeCreateAt = async () => {
    const db = getFirestore();

    console.log("Get Patients");
    const patientDocs = [];
    const patients = await getDocs(collection(db, "/organizations/p2p/patients"));
    patients.forEach((doc) => {
      patientDocs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    for (let i = 0; i < patientDocs.length; i++) {
      const p = patientDocs[i];
      try {
        if (!p.CreateTime) continue;

        let newFields = {};
        newFields.CreateAt = p.CreateTime;

        const patientRef = doc(db, "/organizations/p2p/patients", p.id);
        await updateDoc(patientRef, newFields);
        console.log(`${p.id} done - ${i}`);
      } catch (err) {
        console.log(err);
        console.log("err : ", p.id);
      }
    }
  };

  const handleLastDoseTimeLastDoseAt = async () => {
    const db = getFirestore();

    console.log("Get Patients");
    const patientDocs = [];
    const patients = await getDocs(collection(db, "/organizations/p2p/patients"));
    patients.forEach((doc) => {
      patientDocs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log("Get Vaccines");
    const vacDocs = [];
    const vacs = await getDocs(collection(db, "/organizations/p2p/vaccinations"));
    vacs.forEach((doc) => {
      vacDocs.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(patientDocs);
    console.log(vacDocs);

    for (let i = 0; i < patientDocs.length; i++) {
      const p = patientDocs[i];
      console.log(p);

      try {
        var pvacs = vacDocs.filter((v) => v.PatientId === p.id);
        pvacs.sort((a, b) => {
          if (a.Time.toDate() < b.Time.toDate()) return -1;
          if (a.Time.toDate() > b.Time.toDate()) return 1;
          return 0;
        });

        let newFields = {};
        // if (!p.UserId) {
        //   newFields.UserId = "p7utTjlilmZ6ZH3mrtLJiysx7yW2";
        //   newFields.UserName = "admin";
        // }
        if (pvacs.length > 0) {
          newFields.LastDoseAt = pvacs[pvacs.length - 1].Time;
        } else {
          let startDate = moment();
          startDate.set("month", 9);
          startDate.set("date", 17);
          startDate.set("hour", 9);
          startDate.set("minute", 0);
          startDate.set("second", 0);
          startDate.set("millisecond", 0);
          newFields.UpdateAt = startDate.toDate();
        }

        //console.log(newFields);

        const patientRef = doc(db, "/organizations/p2p/patients", p.id);
        await updateDoc(patientRef, newFields);
        console.log(`${p.id} done - ${i}`);
      } catch (err) {
        console.log(err);
        console.log("err : ", p.id);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold">Special Functions</span>
      <div className="flex flex-auto">
        <button className="bg-red-300 rounded-md p-4 m-4 h-18 min-w-48" onClick={handleAddNames2Vac}>
          Add HCP Name and Patient Name to Vaccinations
        </button>
        <button className="bg-red-300 rounded-md p-4 m-4 h-18 min-w-48" onClick={handlePatientExtraData}>
          Add CreateAt, LastDoseAt and BirthdayOfYear to Patient
        </button>
        <button className="bg-red-300 rounded-md p-4 m-4 h-18 min-w-48" onClick={handlePatientCreateTimeCreateAt}>
          CreateTime - CreateAt
        </button>
        <button className="bg-red-300 rounded-md p-4 m-4 h-18 min-w-48" onClick={handleLastDoseTimeLastDoseAt}>
          LastDoseTime - LastDoseAt
        </button>
      </div>
    </div>
  );
};

export default SpecialFunctions;
