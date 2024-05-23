import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Cancel, Delete, LockClock, Sort } from "@mui/icons-material";
import { FormControl, MenuItem, debounce } from "@mui/material";
import { Select, Tooltip } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index(props) {
    const jadwal = props.jadwal;
    const count = props.count;
    const columns = [
        {
            name: "#",
            selector: (row, key) => key + 1,
            width: "60px",
            wrap: true,
        },

        {
            name: "Judul Jadwal",
            selector: (row) => row.judul_jadwal,

            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.nam_pelanggan,

            wrap: true,
        },
        {
            name: "Kontak Pelanggan",
            selector: (row) => row.kontak_pelanggan,

            wrap: true,
        },
        {
            name: "Kode Pesanan",
            selector: (row) => row.kd_pesanan,
            wrap: true,
        },

        {
            name: "Jadwal Pemotretan",
            selector: (row) =>
                moment(row.tanggal_foto).format("DD-MMMM-YYYY") +
                " " +
                row.jam_foto,
            wrap: true,
        },
        {
            name: "Catatan",
            selector: (row) => row.catatan,
            wrap: true,
        },
        {
            name: "Status Jadwal",
            selector: (row) => row.status,
            wrap: true,
        },

        {
            name: "Created_at",
            selector: (row) =>
                moment(row.created_at).subtract(1, "hour").fromNow(),
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex flex-col md:flex-row gap-1">
                    <button
                        onClick={() => deleteHandler(row)}
                        className="py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition-all duration-300 ease-in-out text-xs"
                    >
                        <Tooltip title={`Delete ${row.judul_jadwal}`}>
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];

    const deleteHandler = (row) => {
        Swal.fire({
            title: `Hapus ${row.judul_jadwal}`,
            text: `Apakah anda ingin menghapus ${row.judul_jadwal}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus User",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("delete.kelola-jadwal", { id: row.id }), {
                    onError: (errors) => {
                        Swal.fire({
                            position: "center",
                            title: "Error",
                            text: "Gagal menghapus user",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menghapus user",
                            icon: "success",
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            } else if (result.dismiss) {
            }
        });
    };

    const [filter, setFilter] = useState(false);

    const [params, setParams] = useState({
        cari: "",
        status: "",

        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.kelola-jadwal"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <div className="my-3 grid grid-cols-2 md:grid-cols-5 gap-3 transition-all duration-300 ease-in-out px-4">
                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-green-800  via-green-700 to-green-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <LockClock color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white">
                            {count.jadwal_bulan_ini}
                        </p>
                        <p className="text-white text-xs">
                            Jadwal Di bulan ini
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-blue-800  via-blue-700 to-blue-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <LockClock color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white">
                            {count.jadwal_selesai}
                        </p>
                        <p className="text-white text-xs">Jadwal Selesai</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-yellow-800  via-yellow-700 to-yellow-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <LockClock color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white">
                            {count.jadwal_belum_selesai}
                        </p>
                        <p className="text-white text-xs">
                            Jadwal Belum Selesai
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-orange-800  via-orange-700 to-orange-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <LockClock color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white ">
                            {count.dibatalkan}
                        </p>
                        <p className="text-white text-xs">
                            Total Jadwal Dibatalkan
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 justify-between items-center bg-gradient-to-bl from-orange-800  via-orange-700 to-orange-500 py-2 px-4 rounded-md shadow-sm shadow-gray-500/50">
                    <h3 className="text-white font-bold text-4xl lg:text-7xl transition-all duration-300 ease-in-out">
                        <LockClock color="inherit" fontSize="inherit" />
                    </h3>
                    <div className="text-right">
                        <p className="text-4xl font-bold text-white ">
                            {count.all}
                        </p>
                        <p className="text-white text-xs">Total Jadwal</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center px-4">
                <Link
                    as="button"
                    href={route("admin.create-kelola-jadwal")}
                    className="py-2 px-4 text-white font-bold bg-blue-500"
                >
                    Tambah Jadwal
                </Link>
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
                            <MenuItem value="">Status Jadwal</MenuItem>
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
            </div>
            <div className="py-2 px-4 w-full text-black">
                <DataTable
                    dense
                    highlightOnHover
                    pagination
                    data={jadwal}
                    columns={columns}
                />
            </div>
        </div>
    );
}
Index.layout = (page) => (
    <Authenticated children={page} title="Kelola Jadwal" />
);
