import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Cancel, Sort } from "@mui/icons-material";
import { FormControl, MenuItem, Tooltip, debounce } from "@mui/material";
import { Select } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const pesanan = props.pesanan;
    const [filter, setFilter] = useState(false);
    const id = props.id;
    const [params, setParams] = useState({
        cari: "",
        status: "",

        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.show-pesanan-pelanggan", id), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const columns = [
        {
            name: "#",
            width: "60px",
            wrap: "true",
            selector: (row, index) => index + 1,
        },
        {
            name: "Kode Pesanan",
            width: "120px",
            wrap: true,
            selector: (row) => row.kd_pesanan,
        },
        {
            name: "Nama Pemesan",
            width: "120px",
            wrap: true,
            selector: (row) => row.user.name,
        },
        {
            name: "Jumlah Pesanan",
            width: "130px",
            wrap: true,
            selector: (row) => row.detail_pesanan_count + " Paket di pesan",
        },
        {
            name: "Tanggal Pesanan",
            width: "120px",
            wrap: true,
            selector: (row) => moment(row.tgl_pesanan).format("DD-MMMM-YYYY"),
        },

        {
            name: "Total Pembayaran",
            wrap: true,
            width: "150px",
            selector: (row) => (
                <CurrencyInput
                    value={row.total_pembayaran}
                    className="border-none"
                    disabled
                    prefix="Rp. "
                />
            ),
        },
        {
            name: "Status Pembayaran",
            wrap: true,
            width: "130px",
            selector: (row) => row.status_pembayaran,
        },
        {
            name: "Status Pembayaran",
            wrap: true,
            selector: (row) => row.status_pemesanan,
        },
        {
            name: "Aksi",

            selector: (row) => (
                <div className="flex gap-3">
                    <Link
                        href={route(
                            "admin.detail-pesanan-pelanggan",
                            row.kd_pesanan
                        )}
                        className="bg-blue-500 text-white py-2 px-3 rounded-md"
                    >
                        Lihat
                    </Link>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <div className="rounded-md bg-white py-3 px-4">
                <div className="flex justify-end gap-3">
                    <InputText
                        name="Cari"
                        title={"Cari..."}
                        value={params.value}
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                    />
                    <FormControl>
                        <Select
                            className="w-[50px] md:w-[150px] h-[55px] "
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={params.status}
                            onChange={(e) =>
                                setParams({ ...params, status: e })
                            }
                            label="Age"
                        >
                            <MenuItem value="">Status Pemsanan</MenuItem>
                            <MenuItem value={"selesai"}>Selesai</MenuItem>
                            <MenuItem value={"belum selesai"}>
                                Belum Selesai
                            </MenuItem>
                            <MenuItem value={"di batalkan"}>
                                Di batalkan
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {filter == false ? (
                        <button
                            onClick={() => setFilter(true)}
                            className="text-2xl bg-orange-500 py-2 px-2 rounded-md text-white"
                        >
                            <Tooltip title="Filter Berdasarkan Tanggal">
                                <Sort color="inherit" fontSize="inherit" />
                            </Tooltip>
                        </button>
                    ) : (
                        <button
                            onClick={() => setFilter(false)}
                            className="text-2xl bg-red-500 py-2 px-2 rounded-md text-white"
                        >
                            <Cancel color="inherit" fontSize="inherit" />
                        </button>
                    )}
                </div>
                {filter && (
                    <div className="flex justify-end gap-3 my-3">
                        <InputText
                            label={"Dari Tanggal"}
                            type="date"
                            value={params.dari_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    dari_tanggal: e.target.value,
                                })
                            }
                        />
                        <InputText
                            label={"Sampai Tanggal"}
                            type="date"
                            value={params.sampai_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    sampai_tanggal: e.target.value,
                                })
                            }
                        />
                    </div>
                )}
                <DataTable
                    dense
                    highlightOnHover
                    pagination
                    data={pesanan}
                    columns={columns}
                />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <Authenticated children={page} title="Pesanan Pelanggan" />
);
