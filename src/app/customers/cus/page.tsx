"use client";
import Navbar from "@/components/CommonComponents/Layout/Navbar";
import React, { useEffect, useState } from "react";
import TitleBar from "@/components/CommonComponents/Layout/bars/TitleBar";
import EditIC from "@/Svg/editIC";
import { useSearchParams } from "next/navigation";
import "@/Style/MTri/Loading.css";
import "@/Style/MTri/TableSetupOrderCus.css";
import "@/Style/MTri.css";

import SortIC from "@/Svg/sortIC";
import AcceptIC from "@/Svg/accept";
import { toast } from "react-toastify";
type customerType = {
  cusId: string;
  cusName: string;
  cusEmail: string;
  cusPhone: number;
  cusAddress: string;
  cusGender: number;
  cusBirthday: string;
};

interface OrderType {
  orderId: string;
  paymentId: string;
  senderAddress: string;
  receiverPhone: string;
  receiverName: string;
  receiverAddress: string;
  orderIsFragile: boolean;
  orderNote: string;
  orderCOD: number;
  deliverPrice: number;
  orderType: "Nội thành" | "Ngoại thành"; // Giới hạn giá trị
  proofSuccess: string;
  reasonFailed: string;
  totalPrice: number;
  createdDate: Date;
  customerDetails: CustomerDetails;
  driverDetails: DriverDetails;
  deliveryStatus: DeliveryStatus;
  deliveryServices: DeliveryServices;
}
interface CustomerDetails {
  cusId: string;
  cusName: string;
  cusEmail: string;
}

interface DriverDetails {
  driverId: string;
  driverName: string;
}

interface DeliveryStatus {
  statusId: string;
  statusName: string;
}

interface DeliveryServices {
  dservicesId: string;
  dservicesName: string;
  dservicesPrice: number;
  dservicesTime: string;
}

type CSKHType = {
  Request_ID: string;
  Cus_ID: string;
  Order_ID: string;
  Driver_ID: string;
  Request_Picture: string;
  Request_Status: string;
  Request_Date: Date;
  Request_Type: string;
};
const CusDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")?.replace(/'/g, "");
  const email = searchParams.get("email")?.replace(/'/g, "");
  const phone = searchParams.get("phone")?.replace(/'/g, "");
  // const id = pathName.split("/").pop();

  const [customer, setCustomer] = useState<customerType | null>(null);
  const [cusEmail, setCusEmail] = useState<string>("");
  const [cusPhone, setCusPhone] = useState<string>("");
  const [cusAddress, setCusAddress] = useState<string>("");
  const [requests, setRequests] = useState<CSKHType[]>([]);
  const [tab, setTab] = useState<string>("LSD"); // LSD: Lịch sử đơn, LSYC: Lịch sử yêu cầu
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderWarning, setOrderWarning] = useState<string>("");
  const [requestWarning, setRequestWarning] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/customer/update/${customer?.cusId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cusEmail,
            cusPhone,
            cusAddress,
          }),
        }
      );
      const updatedCustomer = await response.json();
      if (!response.ok) {
        toast.info(updatedCustomer.message);
        throw new Error("Error updating driver");
      }
      toast.success("Cập nhật thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleClick = (tabName: string) => {
    setTab(tabName);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      try {
        let queryParam = "";
        if (id !== undefined && id !== null) {
          queryParam = `id=${id}`;
        } else if (email !== undefined && email !== null) {
          queryParam = `email=${email}`;
        } else if (phone !== undefined && phone !== null) {
          queryParam = `phone=${phone}`;
        }
        console.log(queryParam);

        const response = await fetch(
          `http://localhost:5000/api/customer/cus?${queryParam}`
        );
        console.log(`http://localhost:5000/api/customer/cus?${queryParam}`);

        if (!response.ok) {
          throw new Error("Customer not found");
        }
        const result = await response.json();
        setCustomer(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [id, email, phone]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [cancelCounter, setCancelCounter] = useState<number>(0);

  // Lấy order list
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/order/${id}`, {
          method: "GET",
        });

        const result = await response.json();
        if (!response.ok) {
          if (result.message) {
            return setOrderWarning(result.message);
          }
          throw new Error("Network not ok");
        }

        setOrders(result);
        // console.log(orders);

        const cancelOrderCount = result.filter(
          (order: OrderType) => order.deliveryStatus.statusId === "ST004"
        ).length;
        setCancelCounter(cancelOrderCount);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id, email, phone]);

  // Lấy requests list
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/request/${id}`);
        if (!response.ok) {
          throw new Error("Network not ok");
        }
        const result = await response.json();
        if (result.message) {
          setRequestWarning(result.message);
        } else {
          setRequests(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
  }, [id, email, phone]);

  // Hàm định dạng ngày giờ

  const formatDate = (datetime: Date) => {
    const date = new Date(datetime);
    console.log(datetime);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    console.log(formattedDate);
    return formattedDate;
  };

  return (
    <div className="flex ">
      <Navbar>
        <div className="body flex flex-col gap-6 h-full">
          <TitleBar text="Chi tiết khách hàng" />

          {isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="text-base font-bold text-navbarText">
                Đang tải dữ liệu...
              </p>
            </div>
          ) : (
            // Customer details
            <div className="detailBox flex flex-col h-full">
              <div className="boxHeader flex flex-row">
                <div className="basicDetail flex flex-row bg-white w-full p-6 rounded-md gap-4 ">
                  <div className="detail flex flex-row flex-1 gap-4">
                    <div className="profileAvt w-[92px] h-[92px] rounded-full bg-slate-300" />
                    <div className="flex flex-col justify-center gap-1">
                      <div className="flex flex-row gap-3 items-center">
                        <p className="Name font-bold text-base">
                          {customer ? customer.cusName : ""}
                        </p>
                        {isEditing ? (
                          <button type="button" onClick={() => handleUpdate()}>
                            <AcceptIC width={16} height={16} fill="#0da651" />
                          </button>
                        ) : (
                          <button type="button" onClick={() => handleEdit()}>
                            <EditIC width={16} height={16} stroke="#1c1c1c" />
                          </button>
                        )}
                      </div>

                      {/* Trường email khách hàng */}
                      <div className="textIcon flex flex-row ">
                        {isEditing ? (
                          <div className="flex flex-row w-full items-center justify-between">
                            <input
                              className="placeholder:text-xs outline-none text-xs text-normalText"
                              placeholder={
                                customer && customer.cusEmail
                                  ? customer.cusEmail
                                  : "Bổ sung"
                              }
                              value={cusEmail}
                              onChange={(e) => setCusEmail(e.target.value)}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row w-full items-center justify-between gap-3">
                            <p className="Gmail text-xs text-navbarText">
                              {customer ? customer.cusEmail : ""}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Trường sđt khách hàng */}
                      <div className="textIcon flex flex-row ">
                        {isEditing ? (
                          <div className="flex flex-row w-full items-center justify-between">
                            <input
                              className="placeholder:text-xs outline-none text-xs text-normalText"
                              placeholder={
                                customer && customer?.cusPhone
                                  ? String(customer.cusPhone)
                                  : "Bổ sung"
                              }
                              value={cusPhone}
                              onChange={(e) => setCusPhone(e.target.value)}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row w-full items-center justify-between gap-3">
                            <p className="Gmail text-xs text-navbarText">
                              {customer && customer.cusPhone
                                ? customer.cusPhone
                                : "Bổ sung"}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Trường địa chỉ khách hàng */}
                      <div className="textIcon flex flex-row ">
                        {isEditing ? (
                          <div className="flex flex-row w-full items-center justify-between">
                            <input
                              className="placeholder:text-xs outline-none text-xs text-normalText"
                              placeholder={
                                customer && customer?.cusAddress
                                  ? customer.cusAddress
                                  : "Bổ sung"
                              }
                              value={cusAddress}
                              onChange={(e) => setCusAddress(e.target.value)}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row w-full items-center justify-between gap-3">
                            <p className="Gmail text-xs text-navbarText">
                              {customer && customer.cusAddress
                                ? customer.cusAddress
                                : "Bổ sung"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="detail flex flex-row flex-1 gap-12 justify-center items-center">
                    <div className="senderCounterTitle flex flex-col items-center gap-3">
                      <p className="text-base text-navbarText font-bold">
                        Đơn gửi
                      </p>
                      <p className="senderCounter text-normalText font-bold text-sm">
                        {orders.length}
                      </p>
                    </div>
                    {/* <div className="receiverCounterTitle flex flex-col items-center gap-3">
                      <p className="text-base text-navbarText font-bold">
                        Đơn nhận
                      </p>
                      <p className="receiverCounter text-normalText font-bold text-sm">
                        3
                      </p>
                    </div> */}
                    <div className="cancelCounterTitle flex flex-col items-center gap-3">
                      <p className="text-base text-navbarText font-bold">
                        Đơn hủy
                      </p>
                      <p className="cancelCounter text-normalText font-bold text-sm">
                        {cancelCounter}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Box */}
              <div className="TableBody w-full h-full bg-white px-6 flex flex-col gap-4">
                <div className="choosenTab w-full flex flex-row gap-3 justify-center items-center">
                  <p
                    style={{
                      color: `${tab === "LSD" ? "#0DA651" : "#696969"}`,
                    }}
                    className="text-base font-bold cursor-pointer"
                    onClick={() => handleClick("LSD")}
                  >
                    Lịch sử đơn
                  </p>
                  <div className="devider w-[1px] h-6 bg-navbarText"></div>
                  <p
                    style={{
                      color: `${tab === "LSYC" ? "#0DA651" : "#696969"}`,
                    }}
                    className="text-base font-bold text-navbarText cursor-pointer"
                    onClick={() => handleClick("LSYC")}
                  >
                    Lịch sử yêu cầu
                  </p>
                </div>

                <div className="table-container">
                  {tab === "LSD" ? (
                    <table className="orderOfCusTable min-w-full bg-white table-fixed rounded-md">
                      {/* Title từng cột */}
                      <thead>
                        <tr>
                          <th className="h-[42px] break-words p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full w-full justify-end">
                              <p>STT</p>
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Mã vận đơn</p>
                              <div className="Sort">
                                <SortIC />
                              </div>
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Tài xế</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Người nhận</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Số điện thoại</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Ngày lên đơn</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Địa chỉ</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Trạng thái</p>
                              <SortIC />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {isLoading ? (
                        <div className="spinner-container">
                          <div className="spinner"></div>
                          <p className="text-base font-bold text-navbarText">
                            Đang tải dữ liệu...
                          </p>
                        </div>
                      ) : orderWarning ? (
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="noresult w-40 h-40"></div>
                          <p className=" text-yellowText">{orderWarning}</p>
                        </div>
                      ) : (
                        <tbody>
                          {orders.map((order, index) => (
                            <tr key={index}>
                              <td className="h-[42px] break-words p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full w-full justify-end">
                                  <p>{index + 1}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>{order.orderId}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>
                                    {order.driverDetails
                                      ? order.driverDetails.driverName
                                      : "---"}
                                  </p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>{order.receiverName}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>{order.receiverPhone}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>{formatDate(order.createdDate)}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full overflow-hidden text-ellipsis">
                                  <p className="overflow-hidden text-ellipsis">
                                    {order.receiverAddress}
                                  </p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p
                                    style={{
                                      color: `${
                                        order.deliveryStatus.statusId ===
                                        "ST001"
                                          ? "#FBA333"
                                          : order.deliveryStatus.statusId ===
                                            "ST002"
                                          ? "#007AFF"
                                          : order.deliveryStatus.statusId ===
                                            "ST003"
                                          ? "#0DA651"
                                          : "#F61317"
                                      }`,
                                    }}
                                    className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                                  >
                                    {order.deliveryStatus.statusName}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  ) : (
                    <table className="requestOfCusTable min-w-full bg-white table-fixed rounded-md">
                      {/* Title từng cột */}
                      <thead>
                        <tr>
                          <th className="h-[42px] break-words p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full w-full justify-end">
                              <p>STT</p>
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Mã yêu cầu</p>
                              <div className="Sort">
                                <SortIC />
                              </div>
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Mã đơn</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Ngày yêu cầu</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Loại yêu cầu</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Đính kèm</p>
                              <SortIC />
                            </div>
                          </th>
                          <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                            <div className="flex flex-row gap-[6px] items-center h-full">
                              <p>Trạng thái</p>
                              <SortIC />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {isLoading ? (
                        <div className="spinner-container">
                          <div className="spinner"></div>
                          <p className="text-base font-bold text-navbarText">
                            Đang tải dữ liệu...
                          </p>
                        </div>
                      ) : requestWarning ? (
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="noresult w-40 h-40"></div>
                          <p className=" text-yellowText">{requestWarning}</p>
                        </div>
                      ) : (
                        <tbody>
                          {requests.map((request, index) => (
                            <tr key={index}>
                              <td className="h-[42px] break-words p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full w-full justify-end">
                                  <p>{index + 1}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>{request.Request_ID}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>{request.Order_ID}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>{formatDate(request.Request_Date)}</p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p>
                                    {request.Request_Type === "HBV"
                                      ? "Hàng bị vỡ"
                                      : request.Request_Type === "HBL"
                                      ? "Hàng bị lạc"
                                      : request.Request_Type === "HCG"
                                      ? "Hàng chưa giao"
                                      : "Chưa nhận được tiền"}
                                  </p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full">
                                  <p className="overflow-hidden text-ellipsis">
                                    {request.Request_Picture}
                                  </p>
                                </div>
                              </td>
                              <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                                <div className="flex flex-row gap-[6px] items-center h-full overflow-hidden text-ellipsis">
                                  <p className="overflow-hidden text-ellipsis">
                                    {request.Request_Status === "Pending"
                                      ? "Chờ xử lý"
                                      : "Đã xử lý"}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default CusDetails;
