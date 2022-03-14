import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { nanoid } from "nanoid";
import withUser from "../hocs/with_user";
import { get_sale_by_id } from "../graphql/sale";

const VaccinationRecordTable = (props) => {
  const { id: saleid } = useParams();
  const {
    loading: gqlLoading,
    error,
    data: sale,
  } = useQuery(get_sale_by_id, {
    variables: {
      where: {
        id: saleid,
      },
    },
    pollInterval: 0,
  });
  const [sales, setSale] = useState();
  const { id, org } = props;
  const [emptyRows, setEmptyRows] = useState([]);
  let [loading, setLoading] = useState(true);

  const getDateString = (d) => {
    //console.log("date");
    //console.log(d);
    const m = moment(d);
    return m.format("DD/MM/YYYY");
  };

  useEffect(async () => {
    console.log(sale);
    if (!gqlLoading && sale) {
      setSale(sale.saleRecord);
    }
  }, [gqlLoading]);

  // /// {v.hcp?.Name}
  return (
    <div className="grid grid-cols-5  border-t-2 border-gray-500">
      {/* <div className="p-1 text-center bg-blue-300 border-b-2 border-gray-500 bg-opacity-80">
        <span className="place-self-center">HPV Vaccination</span>
      </div> */}
      {sales && (
        <>
          <div className=" flex flex-col">
            <div className=" flex flex-row border-l-2 border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className=" w-40 border-gray-500 text-sm font-bold border-r-2">နေရပ်</span>
                <span className=" w-60 border-gray-500">{sales.address}</span>
              </div>
              <div className="flex flex-row text-center  border-gray-500  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2"></span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 text-sm font-bold border-r-2">ဘောင်ချာနံပါတ် </span>
                <span className="mr-2 w-60 border-gray-500">{sales.voucher_no} </span>
              </div>
            </div>
            <div className=" flex flex-row border-l-2 border-gray-500">
              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-40 border-gray-500 text-sm font-bold border-r-2">ဖုန်းနံပါတ်</span>
                <span className="w-60 border-gray-500">{sales.metadata}</span>
              </div>
              <div className="flex flex-row text-center  border-gray-500  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2"></span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 text-sm font-bold border-r-2">အာမခံကိုယ်စားလှယ် </span>
                <span className="mr-2 w-60 border-gray-500"> </span>
              </div>
            </div>
            <div className="mb-8 flex flex-row border-l-2 border-gray-500">
              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-40 border-gray-500 text-sm font-bold border-r-2">အဘအမည် </span>
                <span className=" w-60 border-gray-500"> </span>
              </div>
              <div className="flex flex-row text-center  border-gray-500  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2"></span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-44 h-7 border-gray-500 text-sm font-bold border-r-2 ">ဖုန်းနံပါတ် </span>
                <span className="mr-2 w-60 border-gray-500"> </span>
              </div>
            </div>
            <div className="flex flex-row border-l-2  border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-b-2  border-t-2 border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-40 border-gray-500 text-sm font-bold  border-r-2">S.No </span>
                <span className="w-60 border-gray-500 text-sm font-bold ">Particular</span>
              </div>
              <div className="flex flex-row text-center  border-t-2 border-gray-500 border-b-2  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500   text-sm font-bold border-r-2">Qty</span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-t-2 border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-44 border-gray-500 text-sm font-bold border-r-2">Price</span>
                <span className="mr-2 w-60 text-sm font-bold border-gray-500">Amount</span>
              </div>
            </div>
            <div className="flex flex-row border-l-2  border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-b-2 border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-40 border-gray-500  border-r-2">1 </span>
                <span className="w-60 border-gray-500">{sales.particular}</span>
              </div>
              <div className="flex flex-row text-center  border-gray-500 border-b-2  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2">{sales.qty}</span>
              </div>

              <div className=" flex flex-row col-span-2 text-center  border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-44 border-gray-500 border-r-2">{sales.total_amount} </span>
                <span className="mr-2 w-60 border-gray-500">{sales.total_amount} </span>
              </div>
            </div>
            <div className="flex flex-row border-l-2  border-l-transparent border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-gray-500 bg-opacity-80">
                <span className=" w-40 border-gray-500 "></span>
                <span className="w-60 border-gray-500"></span>
              </div>
              <div className="flex flex-row text-center  border-gray-500 bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500 "></span>
              </div>

              <div className="flex flex-row col-span-2 text-center border-l-2  border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 text-sm font-bold border-r-2">စုစုပေါင်း </span>
                <span className="mr-2 w-60 border-gray-500">{sales.give_amount} </span>
              </div>
            </div>
            <div className="flex flex-row border-l-2  border-l-transparent  border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-gray-500 bg-opacity-80">
                <span className=" w-40 border-gray-500 "></span>
                <span className="w-60 border-gray-500"></span>
              </div>
              <div className="flex flex-row text-center  border-gray-500 bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500 "></span>
              </div>

              <div className="flex flex-row col-span-2 text-center border-l-2  border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 text-sm font-bold border-r-2">အတိုးသင့်ငွေ </span>
                <span className="mr-2 w-60 border-gray-500"> </span>
              </div>
            </div>
            <div className="flex flex-row border-l-2 border-l-transparent  border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-gray-500  bg-opacity-80">
                <span className=" w-40 border-gray-500 "></span>
                <span className="w-60 border-gray-500"></span>
              </div>
              <div className="flex flex-row text-center  border-gray-500 bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500 "></span>
              </div>

              <div className="flex flex-row col-span-2 text-center border-l-2  border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 text-sm font-bold border-r-2">ပေးငွေ </span>
                <span className="mr-2 w-60 border-gray-500">{sales.give_amount} </span>
              </div>
            </div>
            <div className=" mb-2 flex flex-row border-l-2  border-l-transparent border-gray-500">
              <div className=" flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                <span className=" w-60 border-gray-500"></span>
                {sales.product_status == "AFTER" && <span className="w-40 border-red-500 border-2 text-sm font-bold rounded-full italic">ကုန်ထုတ်ပေးပြီး</span>}
                {sales.product_status == "Before" && <span className="w-40 text-sm font-bold border-red-500">ကုန်မထုတ်ရသေး</span>}
              </div>
              <div className="flex flex-row text-center border-gray-500 bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500 "></span>
              </div>

              <div className="flex flex-row col-span-2 text-center border-l-2  border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-44 border-gray-500 text-sm font-bold border-r-2">ကျန်ငွေ </span>
                <span className="mr-2 w-60 border-gray-500">{sales.total_amount} </span>
              </div>
            </div>
            {sales.total_amount > 0 && (
              <div className="flex flex-col items-start border-r-0">
                <div className="flex flex-row border-gray-500 bg-opacity-80">
                  <span className="h-7 w-7 mr-2"> </span>{" "}
                  <span className="w-max text-sm font-bold">
                    ကျန်ငွေ ({sales.total_amount}) ကျပ်တိတိအား ({getDateString(sales.installment_at)}) နေ့တွင်ပေးဆပ်ရမည်။{" "}
                  </span>{" "}
                </div>
                <div className=" mr-6 flex flex-row text-center  border-gray-500  bg-opacity-80">
                  <span className=" w-64 mr-4"> </span> <span className="pb-1 w-max"> </span>{" "}
                  <span className="h-7 w-max border-transparent text-sm font-bold">ကြွေးဆပ်ရက်လုံးဝမကျော်ရ။ </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default withUser(VaccinationRecordTable);
