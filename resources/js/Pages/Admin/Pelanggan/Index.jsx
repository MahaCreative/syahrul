import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const pelanggan = props.pelanggan;
    const columns = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Foto Team",
            selector: (row) => (
                <img
                    src={"/storage/" + row.foto}
                    alt=""
                    className="w-[75px] h-[75px] rounded-full"
                />
            ),
            width: "100px",
            wrap: true,
        },
        {
            name: "Nama Lengkap",
            selector: (row) => row.first_name + " " + row.last_name,
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            wrap: true,
        },
        {
            name: "Telp",
            selector: (row) => row.no_telp,
            wrap: true,
        },
        {
            name: "Email",
            selector: (row) => row.user.email,
            wrap: true,
        },
        {
            name: "Register At",
            selector: (row) =>
                moment(row.created_at).subtract(1, "hours").fromNow(),
            wrap: true,
        },
        {
            name: "Jumlah Pesanan",
            selector: (row) => row.user.jumlah_pesanan,
            wrap: true,
        },
        {
            name: "Lihat Pesanan",
            selector: (row) => (
                <Link
                    href={route("admin.show-pesanan-pelanggan", row.user_id)}
                    as="button"
                    className="bg-blue-500 text-white py-2 px-3"
                >
                    Lihat Pesanan
                </Link>
            ),
            wrap: true,
        },
    ];
    const [params, setParams] = useState({
        cari: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <div className="flex justify-between items-center">
                <InputText
                    label={"Cari Pelanggan"}
                    onChange={(e) =>
                        setParams({ ...params, cari: e.target.value })
                    }
                />
                <div className="flex gap-3">
                    <InputText
                        label={"Dari Tanggal"}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                dari_tanggal: e.target.value,
                            })
                        }
                        type="date"
                    />
                    <InputText
                        label={"Sampai Tanggal"}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                sampai_tanggal: e.target.value,
                            })
                        }
                        type="date"
                    />
                </div>
            </div>
            <div className="py-2 px-4 w-full text-black">
                <DataTable
                    dense
                    highlightOnHover
                    pagination
                    data={pelanggan}
                    columns={columns}
                />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <Authenticated children={page} title="Daftar Pelanggan" />
);
