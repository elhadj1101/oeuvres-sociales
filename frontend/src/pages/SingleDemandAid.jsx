import { getUser } from "api/auth";
import React, { useEffect, useState } from "react";

import useStore from "store";
import UserCard from "components/UserCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { financial_aid_infos } from "api/requests";
let type = {};
financial_aid_infos.forEach((e) => {
  type[e.name] = e.description;
});
export default function SingleDemandLoan({ employee }) {
  const StatusColors = {
    approved: "text-green-900 bg-green-100",
    waiting: "text-yellow-900 bg-yellow-100",
    refused: "text-red-900 bg-red-100",
    draft: "text-gray-500 bg-gray-100 border border-gray-200",
  };
  // I will not store the requestedAid because some of its information may change  and the user will not know.
  const [requestedAid, setReqeustedAid] = useState({});
  const [Usr, setUsr] = useState(
    JSON.parse(sessionStorage.getItem("requestedAidUser")) || {}
  );

  const {
    aids,
    allAids,
    AidRequestedId,
    setAidRequestedId,
    user,
    setAidDraftId,
  } = useStore();
  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");
  let aidId = parts[parts.length - 1];
  const navigate = useNavigate();

  useEffect(() => {
    // change it only when we  want new aid
    console.log(AidRequestedId, aidId, aids);
    if (employee) {
      // get the aid details from
      if (aids.length !== 0) {
        if (aids.filter((aid) => aid.id === Number(aidId))[0]) {
          setReqeustedAid(aids.filter((aid) => aid.id === Number(aidId))[0]);
        } else {
          navigate("/");
          toast.error("La page demandée n'existe pas.");
        }
      }
    } else {
      if (allAids.length !== 0) {
        if (allAids.filter((aid) => aid.id === Number(aidId))[0]) {
          setReqeustedAid(allAids.filter((aid) => aid.id === Number(aidId))[0]);
        } else {
          navigate("/");
          toast.error("La page demandée n'existe pas.");
        }
      }
    }
  }, [allAids, aids]);

  useEffect(() => {
    console.log("req", requestedAid);

    if (
      ((employee && allAids.length !== 0) ||
        (!employee && aids.length !== 0)) &&
      requestedAid &&
      Object.keys(requestedAid).length !== 0
    ) {
      if (!employee && AidRequestedId !== aidId) {
        setAidRequestedId(aidId);
        sessionStorage.setItem("requestedAidId", aidId);
        const u = async () => {
          try {
            const usr = await getUser(requestedAid?.employee);
            if (usr) {
              sessionStorage.setItem("requestedAidUser", JSON.stringify(usr));
              setUsr(usr);
            }
          } catch (err) {
            console.log(err);
          }
        };
        u();
      }
    }
  }, [requestedAid]);
  const handleEdit = () => {
    navigate(`/demande-aide-financiere/${aidId}`);
  };
  return (
    <div className="w-full h-full flex flex-col bg-lightgray pt-5 pb-10 px-6  overflow-auto ">
      <div className="flex items-center justify-between">
        <h1 className=" pb-6 bg-lightgray text-xl lg:text-2xl text-black font-bold capitalize">
          Détails de la demande
        </h1>
        {employee && requestedAid?.loan_status === "draft" && (
          <div className="pb-6 flex gap-2 justify-center items-center">
            <div className="flex gap-2 justify-center items-center">
              <div
                onClick={handleEdit}
                className=" bg-light-blue cursor-pointer rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg text-white  "
              >
                <p className="capitalize">Edit</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-grow flex-wrap lg:flex-nowrap gap-7 ">
        {/* aid details card */}

        <div className="w-full">
          <div className="lg:min-w-[60%] xl:min-w-[65%] h-fit bg-white p-4 rounded-lg ">
            <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
              Aperçu
            </h1>
            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <h3 className="font-bold capitalize text-gray-600 ">
                  montant Total de l'aide
                </h3>
                <p className="pl-2 font-semibold text-gray-500">
                  {requestedAid?.loan_amount * requestedAid?.loan_period} DA
                </p>
              </div>
              {/* <div className="">
                <h3 className="font-bold capitalize text-gray-600 ">
                  montant par Mois
                </h3>
                <p className="pl-2 font-semibold text-gray-500">
                  {" "}
                  {requestedAid?.loan_amount} DA
                </p>
              </div> */}

              <div>
                {/* {JSON.stringify(requestedAid)} */}
                <p className="font-bold capitalize text-gray-600 ">
                  demande créée le
                </p>
                <p className="pl-2 font-semibold text-gray-500 ">
                  {requestedAid?.request_created_at}
                </p>
              </div>
              <div>
                <div className="flex items gap-2">
                  <p className="font-bold  capitalize text-gray-600 ">
                    statut de l'aide
                  </p>
                  {!employee && user?.role !== "employee" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-7 w-7 p-0">
                          <span className="sr-only">ouvrir menu</span>
                          <FiEdit3 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Statut</DropdownMenuLabel>
                        <Dialog>
                          {user?.role !== "tresorier" &&
                            requestedAid &&
                            Object.keys(StatusColors)
                              .filter(
                                (status) =>
                                  status !== requestedAid?.financial_aid_status
                              )
                              .map((status) => (
                                <DialogTrigger
                                  key={status}
                                  style={{ width: "100%" }}
                                >
                                  <div className=" w-full cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                                    {status}
                                  </div>
                                </DialogTrigger>
                              ))}
                          {user?.role === "tresorier" &&
                            requestedAid &&
                            Object.keys({
                              finished: "finished",
                              approved: "approved",
                            })
                              .filter(
                                (status) =>
                                  status !== requestedAid.financial_aid_status
                              )
                              .map((status) => (
                                <DialogTrigger
                                  key={status}
                                  style={{ width: "100%" }}
                                >
                                  <div className="w-full cursor-pointer text-left px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                                    {status}
                                  </div>
                                </DialogTrigger>
                              ))}

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Êtes-vous sûr de changer le statut de cet
                                demmande?
                              </DialogTitle>
                              <DialogDescription>
                                Cette action va changer le statut de la demmande
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose>
                                <Button className="hover:bg-white hover:text-light-blue border border-light-blue bg-light-blue">
                                  changer
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <div
                  className={
                    "w-fit py-1 px-3 rounded-3xl mt-1 " +
                    StatusColors[requestedAid?.financial_aid_status]
                  }
                >
                  {requestedAid?.financial_aid_status}
                </div>
              </div>

              <div>
                <p className="font-bold capitalize text-gray-600 ">
                  Type d'aide
                </p>
                <p className="pl-2 font-semibold text-gray-500 capitalize">
                  {type[requestedAid?.financial_aid_type]}
                </p>
              </div>
              {type[requestedAid?.financial_aid_type]?.startsWith("Décès") ? (
                <div>
                  <p className="font-bold capitalize text-gray-600 ">
                    membre de la famille{" "}
                  </p>
                  <p className="pl-2 font-semibold text-gray-500 capitalize">
                    {requestedAid?.family_member}
                  </p>
                </div>
              ) : (
                ""
              )}

              {/* <div>
                <p className="font-bold capitalize text-gray-600 ">
                  durée du prêt
                </p>
                <p className="pl-2 font-semibold text-gray-500 capitalize">
                  {" "}
                  {requestedAid?.loan_period} mois
                </p>
              </div> */}

              {/* <div>
                <p className="font-bold capitalize text-gray-600 ">
                  méthode de paiement
                </p>
                <p className="pl-2 font-semibold text-gray-500  uppercase ">
                  {" "}
                  <span className="lowercase">via</span>{" "}
                  {requestedAid?.payment_method}{" "}
                </p>
              </div> */}
            </div>
            {/* <div className="pt-10">
              <p className="font-bold capitalize text-gray-600 ">
                motivation du prêt
              </p>
              <p className="p-2 break-all  ">
                {requestedAid?.loan_motivation}
              </p>
            </div> */}
            {/* {JSON.stringify(requestedAid)} */}
          </div>

          {/* files */}
          <div className="mt-5 h-fit bg-white p-4 rounded-lg ">
            <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
              Pièces jointes
            </h1>
            <div className="flex gap-3 flex-wrap">
              {requestedAid?.documents?.length !== 0 ? (
                requestedAid?.documents?.map((doc) => (
                  <div className=" flex bg-lightgray space-x-3  w-fit min-w-60 items-center rounded-sm py-3 px-4 border border-gray-300">
                    <img src="/icons/Pdf-icon.png" alt="" />
                    <div className="pr-4">
                      <span className="text-gray-600 font-semibold">
                        {doc?.document_name}
                      </span>
                      <p className=" text-gray-400 font-semibold text-sm ">
                        {doc.document_size} kB
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="capitalize px-2 p-5 text-center w-full">Aucune pièce jointe</p>
              )}
            </div>
          </div>
        </div>

        {/* employee card */}
        {!employee && user?.role !== "employee" && Usr && (
          <UserCard user={Usr} />
        )}
      </div>
    </div>
  );
}
