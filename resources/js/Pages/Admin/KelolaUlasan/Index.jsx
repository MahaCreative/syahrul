import InputText from "@/Components/InputText";
import StyledRating from "@/Components/StyledRating";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Cancel, Print, Sort } from "@mui/icons-material";
import { FormControl, MenuItem, Tooltip, debounce } from "@mui/material";
import { Select } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const ulasan = props.ulasan;

    const [filter, setFilter] = useState(false);

    const [params, setParams] = useState({
        cari: "",
        rating: "",

        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.kelola-ulasan"), query, {
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
            name: "Foto",
            width: "120px",
            wrap: true,
            selector: (row) => <img src={"/storage/" + row.foto} alt="" />,
        },
        {
            name: "Nama Pengulas",
            width: "120px",
            wrap: true,
            selector: (row) => row.nama,
        },
        {
            name: "Ulasan",
            width: "400px",
            wrap: true,
            selector: (row) => row.ulasan,
        },
        {
            name: "Rating",
            width: "230px",
            wrap: true,
            selector: (row) => (
                <StyledRating
                    disabled
                    value={row.rating}
                    name="simple-controlled"
                />
            ),
        },
        {
            name: "Tanggal ulasan",
            width: "140px",
            wrap: true,
            selector: (row) => moment(row.tgl_ulasan).format("DD-MMMM-YYYY"),
        },

        {
            name: "Aksi",

            selector: (row) => (
                <div className="flex gap-3">
                    <Link
                        method="post"
                        href={route("admin.delete-ulasan", row.id)}
                        className="bg-red-500 text-white py-2 px-3 rounded-md"
                    >
                        Delete
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
                            value={params.rating}
                            onChange={(e) =>
                                setParams({ ...params, rating: e })
                            }
                            label="Age"
                        >
                            <MenuItem value="">Pilih Rating</MenuItem>
                            <MenuItem value={"5"}>5</MenuItem>
                            <MenuItem value={"4"}>4</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"1"}>1</MenuItem>
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
                    data={ulasan}
                    columns={columns}
                />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <Authenticated children={page} title="Kelola Ulasan" />
);
