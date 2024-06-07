import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { useAuth } from "../../AuthProvider";
import MyTableContainer from "../../components/MyTableContainer";
import axios from "axios";
import Loader from "../../components/Loader";
import ErrorHandler from "../../components/ErrorHandler";
import { Box, Dialog, Typography } from "@mui/material";
import TenderDetailsDialog from "./TenderDetailsDialog";
import PriceDialog from "./PriceDialog";
import UpdatePriceDialog from "./UpdatepriceDialog";
import StatusBadge from "../../utils/statusstyle";

const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Dashboard = () => {
    const auth = useAuth();
    const [userId, setuserId] = useState(auth?.user);
    const [toggle, setToggle] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pendingdata, setpendingData] = useState([]);
    const [pendingloading, setpendingLoading] = useState(true);
    const [pendingerror, setpendingError] = useState(false);
    const [approveddata, setapprovedData] = useState([]);
    const [approvedloading, setapprovedLoading] = useState(true);
    const [approvederror, setapprovedError] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sendofferdialogOpen, setsendofferdialogOpen] = useState(false);
    const [updateofferdialogOpen, setupdateofferdialogOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [name, setname] = useState("");

    const fetchuserdata = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/users/${userId}`);
            setname(response?.data?.companies[0]?.companyName);
            console.log(response?.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchuserdata();
    }, [userId]);

    const fetchActiveData = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/tenders/getactivetenders/${userId}`);
            setData(response.data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    const fetchPendingData = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/tenders/getpendingtenders/${userId}`);
            setpendingData(response.data);
        } catch (err) {
            setpendingError(true);
        } finally {
            setpendingLoading(false);
        }
    };
    const fetchApprovedData = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/tenders/getapprovedtenders/${userId}`);
            setapprovedData(response.data);
        } catch (err) {
            setapprovedError(true);
        } finally {
            setapprovedLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveData();
        fetchPendingData();
        fetchApprovedData();
    }, [userId]);

    const activeRecord = data.reduce((acc, record) => {
        if (record.priceOffer==null) {
            acc.push({
                id: record.tenderId,
                name: record.name,
                originaddress: record.originaddress,
                destinationaddress: record.destinationaddress,
                transportdate: formatDate(record.transportdate),
                arrivaldate: formatDate(record.arrivaldate),
                starttime: record.starthours,
                endtime: record.endhours,
                movingPrice: record.movingPrice,
                phonenumber: record.phonenumber,
                tenderStatus: record.tenderStatus,
                details: record.details,
                priceOffer: record.priceOffer,
                bestOffer: record.bestOffer,
                priceconfirm: record.priceConfirm,
            });
        }
        return acc;
    }, []) || [];
    
    const pendingRecord = pendingdata.reduce((acc, record) => {
        if (record.priceOffer!=null) {
            acc.push({
                id: record.tenderId,
                name: record.name,
                originaddress: record.originaddress,
                destinationaddress: record.destinationaddress,
                transportdate: formatDate(record.transportdate),
                arrivaldate: formatDate(record.arrivaldate),
                starttime: record.starthours,
                endtime: record.endhours,
                movingPrice: record.movingPrice,
                phonenumber: record.phonenumber,
                tenderStatus: record.tenderStatus,
                details: record.details,
                priceOffer: record.priceOffer,
                bestOffer: record.bestOffer,
                priceconfirm: record.priceConfirm,
            });
        }
        return acc;
    }, []) || [];
    const approvedRecord = approveddata.reduce((acc, record) => {
        if (record.priceconfirm === true) {
            acc.push({
                id: record.tenderId,
                name: record.name,
                originaddress: record.originaddress,
                destinationaddress: record.destinationaddress,
                transportdate: formatDate(record.transportdate),
                arrivaldate: formatDate(record.arrivaldate),
                starttime: record.starthours,
                endtime: record.endhours,
                movingPrice: record.movingPrice,
                phonenumber: record.phonenumber,
                tenderStatus: record.tenderStatus,
                details: record.details,
                priceOffer: record.priceOffer,
                bestOffer: record.bestOffer,
                priceconfirm: record.priceConfirm,
            });
        }
        return acc;
    }, []) || [];
    const columns = [
        {
            field: "id", headerName: "Tender ID", minWidth: 100, flex: 1, renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    {params.id}
                </span>
            },
        },
        {
            field: "tenderStatus", headerName: "Tender Status", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    <StatusBadge status={params?.row?.tenderStatus} />
                </span>
            },
        },
        {
            field: "movingPrice", headerName: "Moving Price", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    {params?.row?.movingPrice} NIS
                </span>
            },
        },
        {
            field: "priceOffer", headerName: "Price Offer", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#FC7023" }} className="table_first_column">
                    {params?.row?.priceOffer}{params?.row?.priceOffer ? "NIS":"-"}
                </span>
            },
        },
        {
            field: "bestOffer", headerName: "Best Offer", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#048611" }} className="table_first_column">
                    {params?.row?.bestOffer} {params?.row?.bestOffer ? "NIS":"-"}
                </span>
            },
        },
        {
            field: "originaddress", headerName: "Origin Address", flex: 1, minWidth: 250,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#C15C7A" }} className="table_first_column" > {params?.row?.originaddress}</span>
            },
        },
        {
            field: "destinationaddress", headerName: "Destination Address", flex: 1, minWidth: 250,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#046E86" }} className="table_first_column" >{params?.row?.destinationaddress}</span>
            },
        },
        {
            field: "date", headerName: "Date", minWidth: 200, flex: 1,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.transportdate} - {params?.row?.arrivaldate}</span>
            },
        },
        {
            field: "hours", headerName: "Hours", minWidth: 150, flex: 1,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.starttime} - {params?.row?.endtime}</span>
            },
        },
        {
            field: "tenderdetails", headerName: "Tender Details", minWidth: 150, flex: 1,
            renderCell: (params) => {
                const onView = () => handleRowClick(params);
                return <span style={{ whiteSpace: "pre-wrap", textDecoration: "underline", color: "#1546F3" }} className="table_first_column" onClick={onView}>Open tender details</span>
            },
        },
        {
            field: "action", headerName: "Action", minWidth: 150, flex: 1,
            renderCell: (params) => {
                const send = () => sendoffer(params);
                const update = () => updateoffer(params);
                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">{params.row.priceOffer ? <button className="bg-orange-400 rounded-lg px-2 text-white" onClick={update}>Edit Offer</button> : <button className="bg-orange-400 rounded-lg px-2 text-white" onClick={send}>submit offer</button>}</span>
            },
        },
    ];
    const pendingcolumns = [
        {
            field: "id", headerName: "Tender ID", minWidth: 100, flex: 1, renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    {params.id}
                </span>
            },
        },
        {
            field: "tenderStatus", headerName: "Tender Status", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    <StatusBadge status={params?.row?.tenderStatus} />
                </span>
            },
        },
        {
            field: "movingPrice", headerName: "Moving Price", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    {params?.row?.movingPrice} NIS
                </span>
            },
        },
        {
            field: "priceOffer", headerName: "Price Offer", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#FC7023" }} className="table_first_column">
                    {params?.row?.priceOffer}{params?.row?.priceOffer ? "NIS":"-"}
                </span>
            },
        },
        {
            field: "bestOffer", headerName: "Best Offer", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#048611" }} className="table_first_column">
                    {params?.row?.bestOffer} {params?.row?.bestOffer ? "NIS":"-"}
                </span>
            },
        },
        {
            field: "originaddress", headerName: "Origin Address", flex: 1, minWidth: 250,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#C15C7A" }} className="table_first_column" > {params?.row?.originaddress}</span>
            },
        },
        {
            field: "destinationaddress", headerName: "Destination Address", flex: 1, minWidth: 250,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#046E86" }} className="table_first_column" >{params?.row?.destinationaddress}</span>
            },
        },
        {
            field: "date", headerName: "Date", minWidth: 200, flex: 1,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.transportdate} - {params?.row?.arrivaldate}</span>
            },
        },
        {
            field: "hours", headerName: "Hours", minWidth: 150, flex: 1,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.starttime} - {params?.row?.endtime}</span>
            },
        },
        {
            field: "tenderdetails", headerName: "Tender Details", minWidth: 150, flex: 1,
            renderCell: (params) => {
                const onView = () => handleRowClick(params);
                return <span style={{ whiteSpace: "pre-wrap", textDecoration: "underline", color: "#1546F3" }} className="table_first_column" onClick={onView}>Open tender details</span>
            },
        },
        {
            field: "action", headerName: "Action", minWidth: 150, flex: 1,
            renderCell: (params) => {
                const update = () => updateoffer(params);
                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">{params.row.priceOffer && params?.row?.tenderStatus==="Active" ? <button className="bg-orange-400 rounded-lg px-2 text-white" onClick={update}>Edit Offer</button> : <button className="bg-gray-400 rounded-lg px-2 text-white">Tender Cancelled</button>}</span>
            },
        },
    ];
    const approvedcolumns = [
        {
            field: "id", headerName: "Tender ID", minWidth: 100, flex: 1, renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    {params.id}
                </span>
            },
        },
        {
            field: "tenderStatus", headerName: "Tender Status", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    <StatusBadge status={params?.row?.tenderStatus} />
                </span>
            },
        },
        {
            field: "movingPrice", headerName: "Moving Price", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    {params?.row?.movingPrice} NIS
                </span>
            },
        },
        {
            field: "priceOffer", headerName: "Price Offer", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#FC7023" }} className="table_first_column">
                    {params?.row?.priceOffer}{params?.row?.priceOffer ? "NIS":"-"}
                </span>
            },
        },
        {
            field: "bestOffer", headerName: "Best Offer", flex: 1, minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#048611" }} className="table_first_column">
                    {params?.row?.bestOffer} {params?.row?.bestOffer ? "NIS":"-"}
                </span>
            },
        },
        {
            field: "originaddress", headerName: "Origin Address", flex: 1, minWidth: 250,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#C15C7A" }} className="table_first_column" > {params?.row?.originaddress}</span>
            },
        },
        {
            field: "destinationaddress", headerName: "Destination Address", flex: 1, minWidth: 250,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#046E86" }} className="table_first_column" >{params?.row?.destinationaddress}</span>
            },
        },
        {
            field: "date", headerName: "Date", minWidth: 200, flex: 1,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.transportdate} - {params?.row?.arrivaldate}</span>
            },
        },
        {
            field: "hours", headerName: "Hours", minWidth: 150, flex: 1,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.starttime} - {params?.row?.endtime}</span>
            },
        },
        {
            field: "name", headerName: "Client Name", minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.name}</span>
            },
        },
        {
            field: "phonenumber", headerName: "Client Phone Number", minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.phonenumber}</span>
            },
        },
        {
            field: "tenderdetails", headerName: "Tender Details", minWidth: 150, flex: 1,
            renderCell: (params) => {
                const onView = () => handleRowClick(params);
                return <span style={{ whiteSpace: "pre-wrap", textDecoration: "underline", color: "#1546F3" }} className="table_first_column" onClick={onView}>Open tender details</span>
            },
        },
        {
            field: "action", headerName: "Action", minWidth: 150, flex: 1,
            renderCell: (params) => {
                const update = () => updateoffer(params);
                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">{params.row.priceOffer && params?.row?.tenderStatus==="Active" ? <button className="bg-orange-400 rounded-lg px-2 text-white" onClick={update}>Edit Offer</button> : <button className="bg-gray-400 rounded-lg px-2 text-white">Price Accepted</button>}</span>
            },
        },
    ];

    const handleRowClick = (params) => {
        setSelectedHistory(params?.row?.details);
        setDialogOpen(true);
    };
    const sendoffer = (params) => {
        setSelectedHistory(params?.row);
        setsendofferdialogOpen(true);
    };
    const updateoffer = (params) => {
        setSelectedHistory(params?.row);
        setupdateofferdialogOpen(true);
    };
    const handleFormCloseAndRefetch = () => {
        setsendofferdialogOpen(false);
        setupdateofferdialogOpen(false);
        fetchActiveData();
        fetchPendingData();
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    const sendofferCloseDialog = () => {
        setsendofferdialogOpen(false);
    };
    const updateofferCloseDialog = () => {
        setupdateofferdialogOpen(false);
    };
    return (
        <div className="bg-white h-full">
            <div className="bg-[#96E0F8] flex justify-between py-3">
                <div>
                    <h2 className='w-full text-xl bm-font'>Click <span className='text-orange-500 px-2'>n</span>Move</h2>
                </div>
                <div className="flex">
                    <FaBell className="mr-3" size={20} />
                    <FaRegUserCircle className="mr-3" size={20} />
                </div>
            </div>
            <div className="py-1 ml-3 flex justify-between">
                {/* <h1>Welcome! {auth.user?.username}</h1> */}
                <div>
                    <h2>Good afternoon, {name}</h2>
                    <h2>Quickly access Your tenders</h2>
                </div>
                <button onClick={() => auth.logOut()} className="btn-submit">
                    logout
                </button>
            </div>
            <div className="flex justify-center items-center mt-5">
                <button onClick={() => setToggle(0)} className={`w-40 h-auto ${toggle === 0 ? 'bg-orange-400' : ' bg-gray-400'} py-4 px-2 rounded-lg mr-3 font-semibold`}>New Tenders</button>
                <button onClick={() => setToggle(1)} className={`w-40 h-auto ${toggle === 1 ? 'bg-orange-400' : ' bg-gray-400'} py-4 px-2 rounded-lg mr-3 font-semibold`}>My Tenders</button>
                <button onClick={() => setToggle(2)} className={`w-40 h-auto ${toggle === 2 ? 'bg-orange-400' : ' bg-gray-400'} py-4 px-2 rounded-lg mr-3 font-semibold`}>Approved Tenders</button>
            </div>
            <div className="mx-10 my-10">
                {loading ? <Loader placement={{ marginTop: '-100px' }} /> :
                    <>
                        {error ? <ErrorHandler online={navigator.onLine} /> :
                            activeRecord && toggle === 0 ?
                                <MyTableContainer columns={columns} data={activeRecord} RowFilterWith="id" customPageSize={25} minHeight="calc(100vh - 200px)" onRowClick={handleRowClick} /> : null
                        }
                    </>
                }
                {pendingloading ? <Loader placement={{ marginTop: '-100px' }} /> :
                    <>
                        {pendingerror ? <ErrorHandler online={navigator.onLine} /> :
                            pendingRecord && toggle === 1 ?
                                <MyTableContainer columns={pendingcolumns} data={pendingRecord} RowFilterWith="id" customPageSize={25} minHeight="calc(100vh - 200px)" onRowClick={handleRowClick} /> : null
                        }
                    </>
                }
                {approvedloading ? <Loader placement={{ marginTop: '-100px' }} /> :
                    <>
                        {approvederror ? <ErrorHandler online={navigator.onLine} /> :
                            approvedRecord && toggle === 2 ?
                                <MyTableContainer columns={approvedcolumns} data={approvedRecord} RowFilterWith="id" customPageSize={25} minHeight="calc(100vh - 200px)" onRowClick={handleRowClick} /> : null
                        }
                    </>
                }
            </div>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <Box sx={{ minwidth: "700px", p: 2, height: "70vh", overflow: "scroll" }}>
                    <Typography variant="h4" color="initial" sx={{ textAlign: "center", mb: 2 }} >
                        Tender Details
                    </Typography>
                    <TenderDetailsDialog DialogData={selectedHistory} />
                </Box>
            </Dialog>
            <Dialog open={sendofferdialogOpen} onClose={sendofferCloseDialog}>
                <Box sx={{ minwidth: "700px", p: 2, overflow: "scroll" }}>
                    {/* <Typography variant="h4" color="initial" sx={{ textAlign: "center", mb: 2 }} >
                        Tender Details
                    </Typography> */}
                    <PriceDialog DialogData={selectedHistory} onCloseAndRefetch={handleFormCloseAndRefetch} />
                </Box>
            </Dialog>
            <Dialog open={updateofferdialogOpen} onClose={updateofferCloseDialog}>
                <Box sx={{ minwidth: "700px", p: 2, overflow: "scroll" }}>
                    {/* <Typography variant="h4" color="initial" sx={{ textAlign: "center", mb: 2 }} >
                        Tender Details
                    </Typography> */}
                    <UpdatePriceDialog DialogData={selectedHistory} onCloseAndRefetch={handleFormCloseAndRefetch} />
                </Box>
            </Dialog>
        </div>
    );
};

export default Dashboard;