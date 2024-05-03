import React, {useState} from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import useStore from "../store/index.js";
import { getUsers } from "../api/auth.js";
import { getOffres } from "../api/offres.js";
import {
  getLoans,
  getAids,
  getAllAids,
  getAllLoans,
  canApplyForLoan,
} from "../api/requests.js";
import { getRecords } from "api/records";

function Dashboard() {
    const [open, setOpen] = useState(false);
  const  usersDontSee = ["employe"];
    const toggleSidebar = () => {
      setOpen(!open);
    };
    const hideSidebar = () => {
      setOpen(false);
    };

  const {
    setCanApplyLoan,
    setAdminUsers,
    user,
    setAllLoans,
    fetchedAllLoans,
    setFetchedAllLoans,
    setAllAids,
    fetchedAllAids,
    setFetchedAllAids,
    setAids,
    fetchedAids,
    setFetchedAids,
    setOffres,
    setFetchedOffres,
    fetchedOffres,
    fetchedAdminUsers,
    setFetchedAdminUsers,
    setLoans,
    setFetchedLoans,
    fetchedLoans,
    setFetchedRecords,
    setRecords,
    fetchedRecords
  } = useStore();
  React.useEffect(() => {
    async function fetchUsers() {
      const dat = await getUsers();
      console.log("fetched users");

      setAdminUsers(dat);
      setFetchedAdminUsers(true);
    }
    async function fetchOffres() {
      const dat = await getOffres();
      setOffres(dat);
      setFetchedOffres(true);
    }
    async function fetchLoans() {
      const dat = await getLoans();
      const canApply = await canApplyForLoan();
      const cond = canApply === "True";
      setCanApplyLoan(cond);
      console.log("fetched loans");

      setLoans(dat);
      setFetchedLoans(true);
    }
    async function fetchAids() {
      const dat = await getAids();
      console.log("fetched Aids");
      setAids(dat);
      setFetchedAids(true);
    }
    async function fetchAllAids() {
      const dat = await getAllAids();
      console.log("fetched All Aids");

      setAllAids(dat);
      setFetchedAllAids(true);
    }
    async function fetchAllLoans() {
      const dat = await getAllLoans();
      console.log("fetched All Loans");
      setAllLoans(dat);
      setFetchedAllLoans(true);
    }

    async function fetchRecords() {
      const dat = await getRecords();
      console.log("fetched records");
      setRecords(dat);
      setFetchedRecords(true);
    }

    if (user && user.is_superuser && !fetchedAdminUsers) fetchUsers();
    if (user && user.role === 'tresorier' && !fetchedRecords) fetchRecords();
    if (!fetchedOffres ) fetchOffres();
    if (!fetchedLoans ) fetchLoans();
    if (!fetchedAids ) fetchAids();
    if (!fetchedAllAids && user && !usersDontSee.includes(user.role)) fetchAllAids();
    if (!fetchedAllLoans && user && !usersDontSee.includes(user.role)) fetchAllLoans();

    //&& user && !user.is_superuser


  }, []);
  return (
    <div className="">
      <div
        className={`   ${
          open ? "z-[99] fixed top-0 -translate-x-full" : " hidden  lg:block "
        }`}
      >
        <Sidebar />
      </div>
      <div className=" lg:ml-[235px] flex flex-col h-screen   ">
        <div className=" flex items-center sticky top-0 w-full z-30   ">
          <img
            className=" h-7 w-7 lg:hidden  "
            src="/icons/menu.png"
            alt=""
            onClick={toggleSidebar}
          />
          <Navbar />
        </div>
        <div onClick={hideSidebar} className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
