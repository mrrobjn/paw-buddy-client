"use client";
import { apiGetAllUser } from "@/apis";
import {
  ActionBar,
  Button,
  TableData,
  TableHeader,
  TableRow,
} from "@/components";
import HeadTitle from "@/components/common/HeadTitle";
import TableFooter from "@/components/table/TableFooter";
import { useEffect, useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa6";

type State = {
  users: User[];
  page: number;
  roleId?: number;
  count: number;
};

const tableHeaders = [
  "Name",
  "Email",
  "Gender",
  "Address",
  "Role",
  "Total pets",
];

const User = () => {
  const [state, setState] = useState<State>({
    users: [],
    page: 1,
    count: 100,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const resData = await apiGetAllUser({
          limit: 10,
          page: state.page,
          roleId: state.roleId,
        });
        if (resData.success) {
          handleChange("users", resData.data);
          handleChange("count", resData.count);
        }
      } catch (error) {}
    };
    getUser();
  }, [state.page, state.roleId]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePageChange = (e: any) => {
    handleChange("page", e.selected + 1);
  };

  const handleRoleFilter = (e: any) => {
    handleChange("page", 1);
    if (e.target.value === "all") {
      handleChange("roleId", undefined);
    } else {
      handleChange("roleId", e.target.value);
    }
  };

  return (
    <div className="bg-lg-blue h-full rounded-xl overflow-y-auto">
      <HeadTitle>User Management</HeadTitle>
      <ActionBar>
        <Button btnType="primary" round>
          <FaPlus />
        </Button>
        <div className="p-3">
          <FaFilter />
        </div>
        <div className="p-3">Filter by Role:</div>
        <div className="pr-5">
          <select
            className="py-2 px-3 rounded-md bg-lg-blue"
            value={state.roleId}
            onChange={handleRoleFilter}
          >
            <option value="all">All</option>
            <option value="3">User</option>
            <option value="2">Vetenarian</option>
            <option value="1">Admin</option>
          </select>
        </div>
      </ActionBar>
      <div className="px-5">
        <table className="w-full bg-secondary rounded-xl">
          <thead>
            <tr>
              <TableHeader style={{ textAlign: "center" }}>#</TableHeader>
              {tableHeaders.map((text, i) => (
                <TableHeader key={i}>{text}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.users.map((user, i) => {
              return (
                <TableRow key={i}>
                  <TableData>{i + 1}</TableData>
                  <TableData>{user.fullName}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.gender ? "Male" : "Female"}</TableData>
                  <TableData>{user.address}</TableData>
                  <TableData>{user.roleData.name_role}</TableData>
                  <TableData>{user.petData.length}</TableData>
                </TableRow>
              );
            })}
          </tbody>
        </table>
        <TableFooter
          count={state.count}
          dataLength={state.users.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default User;
