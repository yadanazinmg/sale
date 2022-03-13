import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { delete_gate, get_gates } from "../../graphql/gate";
import { AddPerson, EditPerson, DeletePerson } from "../../assets/icons/svg_icons";
import paths from "../../routes/paths";
import LoadingIndicator from "../../components/loading_indicator";
import withUser from "../../hocs/with_user";
import DeleteConfirmationBox from "../../controls/delete_confirmation_box";
import { delete_parking_fee, get_parking_fee } from "../../graphql/parking_fee";

const ParkingFeePage = (props) => {
  const {
    loading: gqlLoading,
    error,
    data: gates,
    refetch,
  } = useQuery(get_parking_fee, {
    pollInterval: 0,
    fetchPolicy: "no-cache",
    variables: {
      orderBy: [
        {
          name: "asc",
        },
      ],
    },
  });
  const [deleteParkingFee] = useMutation(delete_parking_fee);
  const [parkingfee, setParkingFee] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [deleteId, setDeleteId] = useState();
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCreate = () => {
    console.log("create");
    navigate(paths.parking_fee_create);
  };

  const handleEdit = (id) => {
    console.log("edit", id);
    navigate(paths.getParkingFeeEdit(id));
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    console.log("delete", id);
  };

  const handleDoseDetail = (id) => {
    console.log("dose", id);
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    gridApi.setQuickFilter(e.target.value);
    //
  };

  const handleConfirmPopupClose = async (confirm) => {
    console.log("Confirm");
    try {
      if (confirm) {
        deleteParkingFee({
          variables: {
            where: {
              id: deleteId,
            },
          },
        }).then((resp) => {
          console.log(resp);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteId(null);
      refetch();
    }
  };

  const rowActionsRenderer = (params) => {
    return (
      <div className="flex flex-row">
        <div className="grid-btn-primary my-1" onClick={() => handleEdit(params.value)}>
          <EditPerson className="w-8 h-8" />
        </div>
        <label htmlFor="delete-confirm" className="grid-btn-important mx-2 my-1 modal-button" onClick={() => handleDelete(params.value)}>
          <DeletePerson className="w-[30px] h-8" />
        </label>
      </div>
    );
    //
  };

  const doseLinkRenderer = (params) => {
    console.log(params);
    if (params.value <= 0) {
      return <span> {params.value} </span>;
    }

    return (
      <a href="#" className="underline w-auto" onClick={() => handleDoseDetail(params.data.id)}>
        _{params.value}_
      </a>
    );
  };

  const modules = useMemo(() => [ClientSideRowModelModule], []);

  const columnDefs = useMemo(
    () => [
      { headerName: "From Min", field: "from_min" },
      { headerName: "To Min", field: "to_min" },
      { headerName: "Duration", field: "duration" },
      { headerName: "Fee", field: "fee" },
      { headerName: "Vehicle Class", field: "vehicle_class" },
      { headerName: "Actions", width: 150, autoHeight: true, field: "id", cellRendererFramework: rowActionsRenderer },
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

  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(gates);
    if (!gqlLoading && gates) {
      setParkingFee(gates.parkingFees);
    }
  }, [gqlLoading]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFilterTextBoxChanged = () => {
    gridOptions.api.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full flex flex-row px-6 py-0 lg:hidden place-content-center">
        <span className="text-3xl font-semibold capitalize ">Parking Fee</span>
      </div>
      <div className="w-full grid grid-cols-3 px-4 py-2 justify-between">
        <div className="flex flex-row">
          <div className="btn btn-circle my-2" onClick={handleCreate}>
            <AddPerson />
          </div>
          <div className="flex flex-row px-6 py-2">
            <span className="pt-2 px-2 text-lg label">Filter</span>
            <input className="input input-primary" type="text" onChange={handleTextChange} />
          </div>
        </div>
        <div className="px-6 py-2 hidden lg:flex place-content-center">
          <span className="pt-2 px-2 text-3xl font-semibold capitalize ">Parking Fee</span>
        </div>
        <div className="">&nbsp;</div>
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
          rowData={parkingfee}
          enableCellTextSelection={true}
          onGridReady={onGridReady}
        ></AgGridReact>
        <DeleteConfirmationBox id="delete-confirm" onClose={handleConfirmPopupClose} />
      </div>
      <LoadingIndicator loading={loading} color="#000099" />
    </div>
  );
};

export default withUser(ParkingFeePage);
