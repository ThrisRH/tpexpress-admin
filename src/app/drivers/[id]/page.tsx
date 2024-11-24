"use client";
import Navbar from "@/components/CommonComponents/Layout/Navbar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import TitleBar from "@/components/CommonComponents/Layout/bars/TitleBar";
import EditIC from "@/Svg/editIC";
import InfoBox from "@/components/CommonComponents/Box/InfoBox";
import { ButtonBorder } from "@/components/CommonComponents/Buttons/Button";
import "@/Style/MTri/Loading.css";
import { useRouter } from "next/navigation";
import Input, {
  InputSelection,
} from "@/components/CommonComponents/Inputs/Inputs";
import "@/Style/MTri.css";

interface vehicleDetails {
  vehicleLicenseBSX: string;
  vehicleTypeId: string;
  vehicleBrand: string;
  vehicleManufacture: Date;
  vehicleColor: string;
  vehicleDisplacement: string;
}
interface DriverType {
  driverId: string;
  driverName: string;
  driverEmail: string;
  driverPhone: number;
  driverAddress: string;
  driverBirth: Date;
  driverCCCDDate: Date;
  driverCCCD: string;
  driverLicenseId: string;
  driverVehicleBSX: string;
  driverLicenseType: string;
  driverGender: number;
  driverViolation: number;
  driverStatus: string;
  driverNationality: string;
  activeOrderCount: number;
  vehicleDetails: vehicleDetails;
  userID: string;
}

// OptionList
const genderOptions: { [key: string]: number } = { Nam: 0, Nữ: 1 };

const DriverDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [driver, setDriver] = useState<DriverType | null>(null);

  const handleGenderChange = (value: string) => {
    setDriverGender(Number(value));
  };
  const handleLicenseChange = (value: string) => {
    setDriverLicenseType(value);
  };

  const vehicleTypeOptions: { [key: string]: string } = {
    "Xe gắn máy": "XGM",
    "Xe mô tô": "XMT",
    "Xe ô tô": "XOT",
  };
  const licenseTypeOptions: { [key: string]: string } = {
    "Bằng lái A1": "A1",
    "Bằng lái A2": "A2",
  };
  const xylanhOptions: { [key: string]: number } = {
    "50cc": 50,
    "125cc": 125,
  };

  const [warning, setWarning] = useState<string>("");
  const [driverName, setDriverName] = useState<string>("");
  const [driverEmail, setDriverEmail] = useState<string>("");
  const [driverPhone, setDriverPhone] = useState<string>("");
  const [driverAddress, setDriverAddress] = useState<string>("");
  const [driverBirth, setDriverBirth] = useState<Date>();
  const [driverCCCDDate, setDriverCCCDDate] = useState<Date>();
  const [driverCCCD, setDriverCCCD] = useState<string>("");
  const [driverLicenseId, setDriverLicenseId] = useState<string>("");
  const [driverVehicleBSX, setDriverVehicleBSX] = useState<string>("");
  const [driverLicenseType, setDriverLicenseType] = useState<string>("");
  const [driverGender, setDriverGender] = useState<number>(0);
  const [driverNationality, setDriverNationality] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const pathName = usePathname();
  const id = pathName.split("/").pop();
  const router = useRouter();

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

  useEffect(() => {
    const fetchDriverData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/driver/${id}`);
        console.log(id, response);
        if (!response.ok) {
          throw new Error("Driver not found");
        }
        const result = await response.json();
        console.log(result);
        setDriver(result[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchDriverData();
    }
  }, [id]);

  const onClickToEdit = () => {
    setIsEditing(true);
  };

  const saveUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/driver/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            driverName,
            driverEmail,
            driverPhone,
            driverAddress,
            driverBirth,
            driverCCCD,
            driverCCCDDate,
            driverLicenseId,
            driverLicenseType,
            driverVehicleBSX,
            driverGender,
            driverNationality,
          }),
        }
      );
      const updatedDriver = await response.json();
      if (!response.ok) {
        console.log(updatedDriver.message);
        throw new Error("Error updating driver");
      }
      console.log("Cập nhật thành công:", updatedDriver);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };
  const deleteAccount = async () => {
    setIsDeleteLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/driver/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      // console.log(id, response);
      if (response.ok) {
        setTimeout(() => {
          setIsDeleteLoading(false);
          router.push("/drivers");
        }, 3000);
      } else {
        console.error("Xóa không thành công!");
        setIsDeleteLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Navbar>
        <div className="body flex flex-col gap-6 h-full">
          <TitleBar text="Chi tiết tài xế" />

          {/* Popup xóa nhân viên*/}
          {isDeleteLoading && (
            <div className="spinnerProcessing-container absolute top-1/2 left-1/2 w-64 h-44 bg-white rounded-md shadow-md">
              <div className="spinner"></div>
              <p className="text-base font-bold text-navbarText">
                Đang xóa dữ liệu...
              </p>
            </div>
          )}

          {/* Lấy dữ liệu chi tiết */}
          {isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="text-base font-bold text-navbarText">
                Đang tải dữ liệu...
              </p>
            </div>
          ) : (
            // driver details
            <div className="detailBox flex flex-col h-full">
              <div className="boxHeader flex flex-row">
                <div className="basicDetail flex flex-row bg-white w-full p-6 rounded-md gap-4 ">
                  <div className="detail flex flex-row flex-1 gap-4">
                    <div className="profileAvt w-[92px] h-[92px] rounded-full" />
                    <div className="flex flex-col justify-center gap-1">
                      <div className="textIcon flex flex-row items-center justify-between gap-3">
                        <p className="Gmail text-xs text-navbarText">
                          {driver ? driver.driverName : ""}
                        </p>
                        <EditIC width={16} height={16} stroke={"#007AFF"} />
                      </div>
                      <div className="textIcon flex flex-row items-center justify-between gap-3">
                        <p className="Sdt text-xs text-navbarText">
                          {driver?.driverPhone}
                        </p>
                        <EditIC width={16} height={16} stroke={"#007AFF"} />
                      </div>
                      <div className="textIcon flex flex-row items-center justify-between gap-3">
                        <p className="Address text-xs text-navbarText text-wrap">
                          {driver && driver.driverAddress !== null
                            ? driver.driverAddress
                            : "Bổ sung"}
                        </p>
                        <EditIC width={16} height={16} stroke={"#007AFF"} />
                      </div>
                    </div>
                  </div>

                  <div className="detail flex flex-row flex-1 gap-12 justify-center items-center">
                    <div className="senderCounterTitle flex flex-col items-center gap-3">
                      <p className="text-base text-navbarText font-bold">
                        Đơn đã giao
                      </p>
                      <p className="senderCounter text-normalText font-bold text-sm">
                        3
                      </p>
                    </div>

                    <div className="cancelCounterTitle flex flex-col items-center gap-3">
                      <p className="text-base text-navbarText font-bold">
                        Đơn giao không thành
                      </p>
                      <p className="cancelCounter text-normalText font-bold text-sm">
                        2
                      </p>
                    </div>

                    <div className="cancelCounterTitle flex flex-col items-center gap-3">
                      <p className="text-base text-navbarText font-bold">
                        Khiếu nại
                      </p>
                      <p className="cancelCounter text-normalText font-bold text-sm">
                        0
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              {/* Thông tin cá nhân */}
              <div className="px-6 detailsBox bg-white pb-6 flex flex-col w-full gap-6 items-center">
                <div className="driverInfo flex flex-col gap-6 w-full">
                  <p className="text-2xl">Thông tin cá nhân</p>
                  <div className="detailsBox flex flex-row w-full gap-6">
                    <div className="leftBox flex flex-col flex-1 gap-3">
                      <InfoBox
                        label="Mã tài xế"
                        content={driver ? driver.driverId : ""}
                      />
                      {isEditing ? (
                        <>
                          <Input
                            border={true}
                            label="Ngày sinh"
                            placeholder={
                              driver.driverBirth !== null
                                ? driver?.driverBirth
                                : "dd-mm-yyyy"
                            }
                            value={driverBirth}
                            onChange={(e) => setDriverBirth(e.target.value)}
                          />
                          <InputSelection
                            options={genderOptions}
                            onChange={handleGenderChange}
                            label="Giới tính"
                          />
                        </>
                      ) : (
                        <>
                          <InfoBox
                            label="Ngày sinh"
                            content={
                              driver && driver.driverBirth
                                ? formatDate(driver.driverBirth)
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Giới tính"
                            content={
                              driver
                                ? driver.driverGender === 0
                                  ? "Nam"
                                  : "Nữ"
                                : ""
                            }
                          />
                        </>
                      )}
                      <InfoBox
                        label="Quốc tịch"
                        content={driver ? driver.driverNationality : "Bổ sung!"}
                      />
                    </div>
                    <div className="rightBox flex flex-col flex-1 gap-3">
                      <InfoBox
                        label="Gmail"
                        content={
                          driver && driver.driverEmail
                            ? driver.driverEmail
                            : "Bổ sung!"
                        }
                      />
                      {isEditing ? (
                        <>
                          <Input
                            border={true}
                            label="CCCD / CMND"
                            placeholder={
                              driver?.driverCCCD !== null
                                ? driver?.driverCCCD
                                : "0000 0000 0000"
                            }
                            value={driverCCCD}
                            onChange={(e) => setDriverCCCD(e.target.value)}
                          />
                          <Input
                            border={true}
                            label="Ngày cấp"
                            placeholder={
                              driver?.driverCCCDDate !== null
                                ? driver?.driverCCCDDate
                                : "dd-mm-yyyy"
                            }
                            value={driverCCCDDate}
                            onChange={(e) => setDriverCCCDDate(e.target.value)}
                          />
                          <Input
                            border={true}
                            label="Số bằng lái"
                            placeholder={
                              driver?.driverLicenseId !== null
                                ? driver?.driverLicenseId
                                : "0000 0000 0000"
                            }
                            value={driverLicenseId}
                            onChange={(e) => setDriverLicenseId(e.target.value)}
                          />
                        </>
                      ) : (
                        <>
                          <InfoBox
                            label="CCCD/CMND"
                            content={
                              driver && driver.driverCCCD
                                ? driver.driverCCCD
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Ngày cấp"
                            content={
                              driver && driver.driverCCCDDate
                                ? formatDate(driver.driverCCCDDate)
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Số bằng lái"
                            content={
                              driver && driver.driverLicenseId
                                ? driver.driverLicenseId
                                : "Bổ sung!"
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thông tin xe, bằng lái,... */}
                {/* <div className="vehicleInfo flex flex-col gap-6 w-full">
                  <p className="text-2xl">Thông tin phương tiện</p>
                  <div className="detailsBox flex flex-row w-full gap-6">
                    {isEditing ? (
                      <>
                        <div className="leftBox flex flex-col flex-1 gap-3">
                          <Input
                            placeholder="VD: 0000 1111 2222"
                            border={true}
                            label="Số bằng lái"
                            value={driverLicenseId}
                            onChange={(e) => setDriverLicenseId(e.target.value)}
                          />
                          <InputSelection
                            options={vehicleTypeOptions}
                            label="Loại phương tiện"
                          />
                          <Input
                            placeholder="VD: Honda Air Blade"
                            border={true}
                            label="Nhãn hiệu, model phương tiện"
                          />
                          <Input
                            placeholder="VD: Đỏ-Đen"
                            border={true}
                            label="Màu sắc phương tiện"
                          />
                        </div>
                        <div className="rightBox flex flex-col flex-1 gap-3">
                          <InputSelection
                            options={licenseTypeOptions}
                            label="Loại bằng lái"
                            onChange={handleLicenseChange}
                          />
                          <Input
                            placeholder="VD: 51B-67890"
                            border={true}
                            label="Biển số xe"
                            value={driverVehicleBSX}
                            onChange={(e) =>
                              setDriverVehicleBSX(e.target.value)
                            }
                          />
                          <Input
                            placeholder="VD: 12/12/2022"
                            border={true}
                            label="Năm sản xuất"
                          />
                          <InputSelection
                            options={xylanhOptions}
                            label="Dung tích xy-lanh"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="leftBox flex flex-col flex-1 gap-3">
                          <InfoBox
                            label="Số bằng lái"
                            content={
                              driver && driver.driverLicenseId
                                ? driver.driverLicenseId
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Loại phương tiện"
                            content={
                              driver && driver.vehicleDetails
                                ? driver.vehicleDetails.vehicleTypeId
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Nhãn hiệu, model phương tiện"
                            content={
                              driver && driver.vehicleDetails
                                ? driver.vehicleDetails.vehicleBrand
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Màu sắc phương tiện"
                            content={
                              driver && driver.vehicleDetails
                                ? driver.vehicleDetails.vehicleBrand
                                : "Bổ sung!"
                            }
                          />
                        </div>
                        <div className="rightBox flex flex-col flex-1 gap-3">
                          <InfoBox
                            label="Loại bằng lái"
                            content={
                              driver && driver.vehicleDetails
                                ? driver.driverLicenseType
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Biển số xe"
                            content={
                              driver && driver.vehicleDetails
                                ? driver.vehicleDetails.vehicleLicenseBSX
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Ngày sản xuất"
                            content={
                              driver && driver.vehicleDetails
                                ? formatDate(
                                    driver.vehicleDetails.vehicleManufacture
                                  )
                                : "Bổ sung!"
                            }
                          />
                          <InfoBox
                            label="Dung tích xy-lanh"
                            content={
                              driver && driver.vehicleDetails
                                ? driver.vehicleDetails.vehicleDisplacement
                                : "Bổ sung!"
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div> */}
                <div className="flex flex-row gap-6">
                  <div className="flex items-center w-[342px]">
                    {isEditing ? (
                      <button
                        onClick={() => saveUpdate()}
                        className="flex flex-row gap-[6px] w-full h-[42px] bg-primaryText300 rounded-md justify-center items-center"
                      >
                        <div className="text flex items-center text-white font-bold text-xs h-full">
                          Lưu thay đổi
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => onClickToEdit()}
                        className="flex flex-row gap-[6px] w-full h-[42px] bg-primaryText300 rounded-md justify-center items-center"
                      >
                        <div className="text flex items-center text-white font-bold text-xs h-full">
                          Chỉnh sửa
                        </div>
                      </button>
                    )}
                  </div>
                  <div
                    className="flex items-center w-[342px]"
                    onClick={() => deleteAccount()}
                  >
                    <ButtonBorder text="Xóa tài khoản" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default DriverDetails;
