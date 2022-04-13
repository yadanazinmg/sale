import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import moment from "moment";
import { nanoid } from "nanoid";
import withUser from "../hocs/with_user";
import { get_sale_by_id, get_sale_by_data } from "../graphql/sale";

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

  const [getCurRecord, { loading: gLoading, data: cusrecord }] = useLazyQuery(get_sale_by_data, {
    fetchPolicy: "network-only",
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
      let tmp = sale.saleRecord;
      if (tmp.customer_id) {
        console.log("in customer");
        getAllRecord(tmp.customer_id);
      } else {
        console.log("in sale");
        setSale(sale.saleRecord);
      }
    }
  }, [gqlLoading]);

  useEffect(async () => {
    setLoading(gLoading);
    if (!gLoading && cusrecord) {
      console.log(cusrecord.saleRecords);
      const tmp = cusrecord.saleRecords;
      console.log(tmp);

      let i = 0;
      const reducer = (map, d) => {
        console.log(d);
        let user = d.customer_id;
        console.log(user);
        if (map[user]) {
          let a = map[user];
          a.cid = user;
          a.count += 1;
          a.customer = d.customer;
          a.voucher_no = d.voucher_no;
          a.address = d.address;
          a.phone = d.phone;
          a.referral = d.referral;
          a.referral_phone = d.referral_phone;
          a.father_name = d.father_name;
          a.particular = d.particular;
          a.qty = d.qty;
          a.price = d.price;
          a.net_amount += d.total_amount ? d.total_amount : 0;
          a.total_amount += d.total_amount ? d.total_amount : 0;
          a.give_amount = d.give_amount ? d.give_amount : 0;
          a.installment_at = d.installment_at;
          a.product_status = d.product_status;
          a.customer_type = d.customer_type;

          // a[i] = d;
          i++;
        } else {
          map[user] = {
            cid: user,
            customer: d.customer,
            voucher_no: d.voucher_no,
            address: d.address,
            phone: d.phone,
            referral: d.referral,
            referral_phone: d.referral_phone,
            father_name: d.father_name,
            particular: d.particular,
            qty: d.qty,
            price: d.price,
            total_amount: d.total_amount ? d.total_amount : 0,
            net_amount: d.total_amount ? d.total_amount : 0,
            give_amount: d.give_amount,
            installment_at: d.installment_at,
            product_status: d.product_status,
            customer_type: d.customer_type,
            // 9000001: d,
          };
        }
        return map;
      };
      const obj = tmp.reduce(reducer, []);
      const result = Object.values(obj);
      console.log(result);
      setSale(result[0]);
    }
  }, [gLoading]);
  // /// {v.hcp?.Name}
  const getAllRecord = (cid) => {
    getCurRecord({
      variables: {
        where: {
          customer_id: {
            equals: cid,
          },
        },
      },
    });
  };

  const getPriceFormat = (value) => {
    console.log(value);
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let dl = dollarUSLocale.format(value);
    console.log(dl);
    return dl;
  };

  return (
    <div className="grid grid-cols-5  border-t-2 border-gray-500">
      {/* <div className="p-1 text-center bg-blue-300 border-b-2 border-gray-500 bg-opacity-80">
        <span className="place-self-center">HPV Vaccination</span>
      </div> */}
      {sales && (
        <>
          <div className="flex flex-col text-lg">
            <div className="flex flex-row border-l-2 border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className=" w-40 border-gray-500 text-lg font-bold border-r-2">အမည်</span>
                <span className=" w-60 border-gray-500">{sales.customer}</span>
              </div>
              <div className="flex flex-row text-center  border-gray-500  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2"></span>
              </div>

              <div className="flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 text-lg font-bold border-r-2">နေ့စွဲ </span>
                <span className="mr-2 w-60 border-gray-500">{getDateString(sales.updated_at)}</span>
              </div>
            </div>
            <div className=" flex flex-row border-l-2 border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className=" w-40 border-gray-500 text-lg font-bold border-r-2">နေရပ်</span>
                <span className=" w-60 border-gray-500">{sales.address}</span>
              </div>
              <div className="flex flex-row text-center  border-gray-500  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2"></span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 text-lg font-bold border-r-2">ဘောင်ချာနံပါတ် </span>
                <span className="mr-2 w-60 border-gray-500">{sales.voucher_no} </span>
              </div>
            </div>
            <div className=" flex flex-row border-l-2 border-gray-500">
              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-40 border-gray-500 text-lg font-bold border-r-2">ဖုန်းနံပါတ်</span>
                <span className="w-60 border-gray-500">{sales.phone}</span>
              </div>
              <div className="flex flex-row text-center  border-gray-500  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2"></span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-44 border-gray-500 font-bold border-r-2">အာမခံကိုယ်စားလှယ် </span>
                <span className="mr-2 w-60 border-gray-500">{sales.referral} </span>
              </div>
            </div>
            <div className="mb-8 flex flex-row border-l-2 border-gray-500">
              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-40 border-gray-500 text-lg font-bold border-r-2">အဘအမည် </span>
                <span className=" w-60 border-gray-500">{sales.father_name}</span>
              </div>
              <div className="flex flex-row text-center  border-gray-500  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500  border-r-2"></span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-44 h-7 border-gray-500 text-lg font-bold border-r-2 ">ဖုန်းနံပါတ် </span>
                <span className="mr-2 w-60 border-gray-500">{sales.referral_phone}</span>
              </div>
            </div>
            <div className="flex flex-row border-l-2  border-gray-500">
              <div className="flex flex-row col-span-2 text-center border-b-2  border-t-2 border-r-2 border-gray-500 bg-opacity-80">
                <span className="h-7 w-40 border-gray-500 text-lg font-bold  border-r-2">S.No </span>
                <span className="w-60 border-gray-500 text-lg font-bold ">Particular</span>
              </div>
              <div className="flex flex-row text-center  border-t-2 border-gray-500 border-b-2  bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500   text-lg font-bold border-r-2">Qty</span>
              </div>

              <div className=" flex flex-row col-span-2 text-center border-t-2 border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-44 border-gray-500 text-lg font-bold border-r-2">Price</span>
                <span className="mr-2 w-60 text-lg font-bold border-gray-500">Amount</span>
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
                <span className="w-44 border-gray-500 border-r-2">{getPriceFormat(sales.price)} </span>
                {sales.customer_type == 1 && (
                  <span className="mr-2 w-60 border-gray-500">{getPriceFormat(parseInt(sales.net_amount) + parseInt(sales.give_amount))} </span>
                )}
                {sales.customer_type == 0 && <span className="mr-2 w-60 border-gray-500">{getPriceFormat(sales.net_amount)}</span>}
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
                <span className="h-7 w-44 border-gray-500 text-lg font-bold border-r-2">စုစုပေါင်း </span>
                {sales.customer_type == 1 && (
                  <span className="mr-2 w-60 border-gray-500">{getPriceFormat(parseInt(sales.net_amount + parseInt(sales.give_amount)))} </span>
                )}
                {sales.customer_type == 0 && <span className="mr-2 w-60 border-gray-500">{getPriceFormat(sales.net_amount)}</span>}
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
                <span className="h-7 w-44 border-gray-500 text-lg font-bold border-r-2">အတိုးသင့်ငွေ </span>
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
                <span className="h-7 w-44 border-gray-500 text-lg font-bold border-r-2">ပေးငွေ </span>
                <span className="mr-2 w-60 border-gray-500">{getPriceFormat(sales.give_amount)} </span>
              </div>
            </div>
            <div className=" mb-2 flex flex-row border-l-2  border-l-transparent border-gray-500">
              <div className=" flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                <span className=" w-60 border-gray-500"></span>
                {sales.product_status == "AFTER" && <span className="w-40 border-red-500 border-2 text-lg font-bold rounded-full italic">ကုန်ထုတ်ပေးပြီး</span>}
                {sales.product_status == "BEFORE" && <span className="w-40 border-red-500 border-2 text-lg font-bold rounded-full italic">ကုန်မထုတ်ရသေး</span>}
              </div>
              <div className="flex flex-row text-center border-gray-500 bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500 "></span>
              </div>

              <div className="flex flex-row col-span-2 text-center border-l-2  border-b-2  border-r-2 border-gray-500 bg-opacity-80">
                <span className="w-44 border-gray-500 text-lg font-bold border-r-2">ကျန်ငွေ </span>
                <span className="mr-2 w-60 border-gray-500">{getPriceFormat(sales.total_amount)} </span>
              </div>
            </div>
            {sales.total_amount > 0 && (
              <div className="flex flex-col items-start border-r-0">
                <div className="flex flex-row border-gray-500 bg-opacity-80">
                  <span className="h-7 w-7 mr-2"> </span>{" "}
                  <span className="w-max text-lg font-bold">
                    ကျန်ငွေ ({sales.total_amount}) ကျပ်တိတိအား ({getDateString(sales.installment_at)}) နေ့တွင်ပေးဆပ်ရမည်။{" "}
                  </span>{" "}
                </div>
                <div className=" mr-6 flex flex-row text-center  border-gray-500  bg-opacity-80">
                  <span className=" w-64 mr-4"> </span> <span className="pb-1 w-max"> </span>{" "}
                  <span className="h-7 w-max border-transparent text-lg font-bold">ကြွေးဆပ်ရက်လုံးဝမကျော်ရ။ </span>
                </div>
              </div>
            )}
            <div className=" mt-24 flex flex-row  border-l-transparent ">
              <div className=" flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                <span className=" w-96 text-lg rounded-full">ရောင်းသူလက်မှတ်_ _ _ _ _ _ _ _ _ _ _ _</span>
              </div>
              <div className="flex flex-row text-center border-gray-500 bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500 "></span>
              </div>

              <div className="flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                <div className=" flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                  <span className=" w-16 border-gray-500 "></span>
                  <span className=" w-80 text-lg rounded-full">ဝယ်သူလက်မှတ်_ _ _ _ _ _ _ _ _ _ _ _</span>
                </div>
                <div className="flex flex-row text-center border-gray-500 bg-opacity-80">
                  {" "}
                  <span className="w-36 border-gray-500 "></span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-row  border-l-transparent ">
              <div className=" flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                <span className=" w-96 text-lg rounded-full">ရောင်းသူအမည်_ _ _ _ _ _ _ _ _ _ _ _ _ _</span>
              </div>
              <div className="flex flex-row text-center border-gray-500 bg-opacity-80">
                {" "}
                <span className="w-36 border-gray-500 "></span>
              </div>

              <div className="flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                <div className=" flex flex-row col-span-2 text-center  border-gray-500 bg-opacity-80">
                  <span className=" w-16 border-gray-500 "></span>
                  <span className="w-80 text-lg rounded-full">ဝယ်သူအမည်_ _ _ _ _ _ _ _ _ _ _ _ _ _</span>
                </div>
                <div className="flex flex-row text-center border-gray-500 bg-opacity-80">
                  {" "}
                  <span className="w-36 border-gray-500 "></span>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
};

export default withUser(VaccinationRecordTable);
