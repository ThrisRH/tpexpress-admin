"use client";
import React, { useEffect, useState } from "react";
import "@/Style/DTri/styles_customers.css";
import { InputWithIcon } from "@/components/CommonComponents/Inputs/Inputs";
import Navbar from "@/components/CommonComponents/Layout/Navbar";
import "@/Style/MTri/Loading.css";

import SortIC from "@/Svg/sortIC";
import { useRouter } from "next/navigation";
interface CustomerType {
  cusId: string;
  cusName: string;
  cusEmail: string;
  cusPhone: number;
  cusAddress: string;
  cusGender: number;
  cusBirthday: string;
}
const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const handleClick = (cus_ID: string) => {
    router.push(`/customers/cus?id=${cus_ID}`);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/customer/", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network not ok");
      }

      const result = await response.json();
      setCustomers(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Sort setup

  const getFirstAndMiddleName = (fullname: string) => {
    return fullname.split(" ").slice(0, -1).join(" ");
  };

  const getLastName = (fullname: string) => {
    return fullname.split(" ").slice(-1).join(" ");
  };

  const [sortState, setSortState] = useState<{
    lastName: boolean;
    firstMiddleName: boolean;
    gender: boolean;
    email: boolean;
    address: boolean;
  }>({
    lastName: false,
    firstMiddleName: false,
    gender: false,
    email: false,
    address: false,
  });

  const sortCustomers = (
    key: "lastName" | "firstMiddleName" | "gender" | "email" | "address"
  ) => {
    const sortedDrivers = [...customers].sort(
      (a: CustomerType, b: CustomerType): number => {
        let comparison = 0;

        switch (key) {
          case "lastName":
            comparison = getLastName(a.cusName).localeCompare(
              getLastName(b.cusName)
            );
            return sortState.lastName ? -comparison : comparison;
          case "firstMiddleName":
            comparison = getFirstAndMiddleName(a.cusName).localeCompare(
              getFirstAndMiddleName(b.cusName)
            );
            return sortState.firstMiddleName ? -comparison : comparison;
          case "gender":
            comparison = a.cusGender - b.cusGender;
            return sortState.gender ? -comparison : comparison;
          case "email":
            comparison = a.cusEmail.localeCompare(b.cusEmail);
            return sortState.email ? -comparison : comparison;
          case "address":
            comparison = a.cusAddress.localeCompare(b.cusAddress);
            return sortState.address ? -comparison : comparison;
          default:
            return 0;
        }
      }
    );

    setCustomers(sortedDrivers);
    setSortState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="all">
      <Navbar>
        <div className="right h-full flex flex-col gap-4">
          <div className="inputright w-[342px]">
            <InputWithIcon
              purpose="search"
              placeholder="Nhập mã / gmail / số điện thoại để tìm"
              background={true}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              pageOfAPI="cusDetails"
            />
          </div>
          <div className="h-full flex flex-col">
            <div className="note-container">
              <p className="note">
                Ghi chú: Ấn vào khách hàng bất kì để xem hoặc thay đổi thông tin
              </p>
            </div>
            <div className="table-container h-full flex-1">
              <table className="cusTable h-full bg-white table-fixed rounded-md">
                {/* Title từng cột */}
                <thead className="shadow-sm">
                  <tr>
                    <th className="h-[42px] break-words p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full w-full justify-end">
                        <p>STT</p>
                      </div>
                    </th>
                    <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full">
                        <p>Mã khách hàng</p>
                      </div>
                    </th>
                    <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full">
                        <p>Họ</p>
                        <button
                          type="button"
                          onClick={() => sortCustomers("firstMiddleName")}
                        >
                          <SortIC />
                        </button>
                      </div>
                    </th>
                    <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full">
                        <p>Tên</p>
                        <button
                          type="button"
                          onClick={() => sortCustomers("lastName")}
                        >
                          <SortIC />
                        </button>
                      </div>
                    </th>
                    <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full">
                        <p>Giới tính</p>
                        <button
                          type="button"
                          onClick={() => sortCustomers("gender")}
                        >
                          <SortIC />
                        </button>
                      </div>
                    </th>
                    <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full">
                        <p>Số điện thoại</p>
                      </div>
                    </th>
                    <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full">
                        <p>Gmail</p>
                        <button
                          type="button"
                          onClick={() => sortCustomers("email")}
                        >
                          <SortIC />
                        </button>
                      </div>
                    </th>
                    <th className="h-[42px] items-center break-words  p-3 text-left truncate">
                      <div className="flex flex-row gap-[6px] items-center h-full">
                        <p>Địa chỉ</p>
                        <button
                          type="button"
                          onClick={() => sortCustomers("address")}
                        >
                          <SortIC />
                        </button>
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
                ) : (
                  <tbody className="h-full">
                    {customers.map((cus, index) => (
                      <tr key={index} onClick={() => handleClick(cus.cusId)}>
                        <td className="h-[42px] break-words p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full w-full justify-end">
                            <p>{index + 1}</p>
                          </div>
                        </td>
                        <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full">
                            <p>{cus.cusId}</p>
                          </div>
                        </td>
                        <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full">
                            <p>
                              {cus.cusName.split(" ").slice(0, -1).join(" ")}
                            </p>
                          </div>
                        </td>
                        <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full">
                            <p>{cus.cusName.split(" ").slice(-1).join(" ")}</p>
                          </div>
                        </td>
                        <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full">
                            <p>{cus.cusGender == 0 ? "Nam" : "Nữ"}</p>
                          </div>
                        </td>
                        <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full">
                            <p>{cus.cusPhone}</p>
                          </div>
                        </td>
                        <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full">
                            <p>{cus.cusEmail}</p>
                          </div>
                        </td>
                        <td className="h-[42px] items-center break-words  p-3 text-left truncate">
                          <div className="flex flex-row gap-[6px] items-center h-full">
                            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                              {cus.cusAddress}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Customers;
