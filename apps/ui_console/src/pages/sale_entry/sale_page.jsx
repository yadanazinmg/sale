import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import paths from "../../routes/paths";
import { AddPerson, MoneyAddIcon, EditPerson, DeletePerson } from "../../assets/icons/svg_icons";
import LoadingIndicator from "../../components/loading_indicator";
import ComfirmationPopup from "../../controls/popup";
import { dateFormatter } from "../../helpers/ag_grid_helpers";
import { delete_sale, get_sales } from "../../graphql/sale";
import DeleteConfirmationBox from "../../controls/delete_confirmation_box";
import { delete_installments } from "../../graphql/installment";

const SalePage = (props) => {
  const {
    loading: gqlLoading,
    error,
    data: ticketTypes,
    refetch,
  } = useQuery(get_sales, {
    variables: {
      where: {
        customer_type: {
          equals: parseInt(0),
        },
      },
    },
    pollInterval: 0,
    fetchPolicy: "no-cache",
  });
  const [deleteSale] = useMutation(delete_sale);
  const [deleteInstallment] = useMutation(delete_installments);
  const [gate, setGate] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [deleteId, setDeleteId] = useState();
  let [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [popup, setPopup] = useState({
    open: false,
    title: "Are You sure you want to delete!",
    id: null,
  });

  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(ticketTypes);
    if (!gqlLoading && ticketTypes) {
      setGate(ticketTypes.saleRecords);
      setRowCount(ticketTypes.saleRecords.length);
    }
  }, [gqlLoading]);

  const handleCreate = () => {
    console.log("create");
    navigate(paths.sale_create);
  };
  const handleEdit = (id) => {
    console.log("edit", id);
    navigate(paths.getSaleEdit(id));
    //
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    console.log("delete", id);
    setPopup({ open: true });
  };

  const handleConfirmPopupClose = async (confirm) => {
    console.log("Before Confirm");
    if (confirm) {
      setPopup({ ...popup, open: false });
      if (confirm) {
        deleteSale({
          variables: {
            where: {
              id: deleteId,
            },
          },
        }).then((resp) => {
          console.log(resp);
          deleteInstallment({
            variables: {
              customer_id: {
                equals: deleteId,
              },
            },
          }).then((resp) => {
            console.log(resp);
          });
        });
        refetch();
      }
    }
  };

  const handleInstallment = (id) => {
    navigate(`/installment_create/${id}`);
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    gridApi.setQuickFilter(e.target.value);
    //
  };
  const rowActionsRenderer = (params) => {
    if (params.data.total_amount > 0) {
      return (
        <div className="flex flex-row">
          <div className="grid-btn-primary mx-2 my-1" onClick={() => handleEdit(params.data.id)}>
            <EditPerson className="w-8 h-8" />
          </div>
          <div className="grid-btn-primary mx-2 my-1" onClick={() => handleInstallment(params.data.id)}>
            <MoneyAddIcon className="w-8 h-8" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row">
          <div className="grid-btn-primary mx-2 my-1" onClick={() => handleEdit(params.data.id)}>
            <EditPerson className="w-8 h-8" />
          </div>
          <label htmlFor="delete-confirm" className="grid-btn-important mx-2 my-1 modal-button bg-error" onClick={() => handleDelete(params.data.id)}>
            <DeletePerson className="w-8 h-8" disabled={true} />
          </label>
        </div>
      );
    }
    //
  };
  const modules = useMemo(() => [ClientSideRowModelModule], []);

  const columnDefs = useMemo(
    () => [
      //{ field: "id", width: 300 },
      { headerName: "ဘောင်ချာနံပါတ်", field: "voucher_no", width: 130 },
      { headerName: "နေ့စွဲ", field: "sale_date", width: 180, valueFormatter: dateFormatter },
      { headerName: "ဝယ်သူအမည်", field: "customer", width: 130 },
      { headerName: "နေရပ်", field: "address", width: 130 },
      { headerName: "ကြွေးဆပ်", field: "give_amount", width: 100 },
      { headerName: "နောက်ဆုံးကြွေးဆပ်နေ့စွဲ", field: "installment_at", width: 180, valueFormatter: dateFormatter },
      { headerName: "ကြွေးကျန်", field: "total_amount", width: 130 },
      { headerName: "Actions", width: 150, autoHeight: true, cellRendererFramework: rowActionsRenderer },
    ],
    []
  );
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full flex flex-row px-6 py-0 lg:hidden place-content-center">
        <span className="text-3xl font-semibold capitalize ">Sale</span>
      </div>
      <div className="w-full grid lg:grid-cols-3 grid-cols-1 px-4 py-2 justify-between">
        <div className="flex flex-row">
          <div className="btn btn-circle my-2" onClick={handleCreate}>
            <AddPerson />
          </div>
          <div className="w-full flex flex-row px-6 py-2">
            <span className="pt-2 px-2 text-lg label">Filter</span>
            <input className="input input-primary" type="text" onChange={handleTextChange} />
          </div>
        </div>
        <div className="px-6 py-2 hidden lg:flex place-content-center">
          <span className="px-2 text-3xl font-semibold capitalize ">Sale</span>
        </div>
        <div className="w-full flex flex-row py-1 lg:place-content-center place-content-end">
          <span className="pt-2 pr-2 text-lg">Count :</span>
          <span className="pt-2 pr-2 text-lg font-semibold">{rowCount}</span>
        </div>
      </div>
      <div className="p-2 w-full h-[calc(100vh-200px)]">
        <AgGridReact
          reactUi="true"
          className="ag-theme-alpine"
          animateRows="true"
          modules={modules}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="single"
          suppressRowClickSelection="true"
          rowData={gate}
          enableCellTextSelection={true}
          onGridReady={onGridReady}
        ></AgGridReact>
        <DeleteConfirmationBox id="delete-confirm" onClose={handleConfirmPopupClose} />
      </div>
      <LoadingIndicator loading={loading} color="#000099" />
    </div>
  );
};

export default SalePage;
