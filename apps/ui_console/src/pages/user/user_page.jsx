import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AddUser, EditUser, DeleteUser, PinIcon, AddPerson } from "../../assets/icons/svg_icons";
import LoadingIndicator from "../../components/loading_indicator";
import paths from "../../routes/paths";
import DeleteConfirmationBox from "../../controls/delete_confirmation_box";
import withUser from "../../hocs/with_user";
import { delete_user, get_users } from "../../graphql/user";
import { dateFormatter } from "../../helpers/ag_grid_helpers";

const UserPage = (props) => {
  const {
    loading: gqlLoading,
    error,
    data: gates,
    refetch,
  } = useQuery(get_users, {
    pollInterval: 0,
    fetchPolicy: "no-cache",
  });
  const [deleteGate] = useMutation(delete_user);
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(props);

  const handleCreate = () => {
    console.log("create");
    navigate(paths.user_create);
  };

  const handleEdit = (id) => {
    console.log("edit", id);
    navigate(paths.getUserEdit(id));
  };

  const handleUserDelete = async (id, name) => {
    if (name === "admin" || name === props.user.NameId) {
      return;
    }
    setDeleteId(id);
  };

  const handleConfirmPopupClose = async (confirm) => {
    console.log(confirm);
    try {
      if (confirm) {
        deleteGate({
          variables: {
            where: {
              id: deleteId,
            },
          },
        }).then((resp) => {
          console.log(resp);
        });
        refetch();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteId(null);
    }
  };

  const handlePasswordChange = (id) => {
    navigate(paths.getUserUpdatePassword(id));
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    gridApi.setQuickFilter(e.target.value);
    const rowCount = gridApi.getModel().getRowCount();
    setRowCount(rowCount);
  };

  const rowActionsRenderer = (params) => {
    return (
      <div className="flex flex-row">
        <div className="grid-btn-primary my-1" onClick={() => handleEdit(params.value)}>
          <EditUser className="w-8 h-8" />
        </div>

        {/* <div className="grid-btn-secondary ml-2 my-1" onClick={() => handlePasswordChange(params.value)}>
          <PinIcon className="w-8 h-8 bg-gray-500" />
        </div> */}
        <label htmlFor="delete-confirm" className="grid-btn-important mx-2 my-1 modal-button" onClick={() => handleUserDelete(params.value, params.data.role)}>
          <DeleteUser className="w-8 h-8" disabled={true} />
        </label>
      </div>
    );
  };

  const modules = useMemo(() => [ClientSideRowModelModule], []);

  const columnDefs = useMemo(
    () => [
      { field: "name" },
      { field: "role", width: 100 },
      { headerName: "Create Time", field: "created_at", width: 180, valueFormatter: dateFormatter },
      { headerName: "Update Time", field: "updated_at", width: 180, valueFormatter: dateFormatter },
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
      setUsers(gates.users);
      setRowCount(gates.users.length);
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
        <span className="text-3xl font-semibold capitalize ">User</span>
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
          <span className="px-2 text-3xl font-semibold capitalize ">User</span>
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
          rowData={users}
          enableCellTextSelection={true}
          onGridReady={onGridReady}
        ></AgGridReact>
        <DeleteConfirmationBox id="delete-confirm" onClose={handleConfirmPopupClose} />
      </div>
      <LoadingIndicator loading={loading} color="#000099" />
    </div>
  );
};

export default withUser(UserPage);
