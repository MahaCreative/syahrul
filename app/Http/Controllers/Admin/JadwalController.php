<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\Jadwal;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Validation\Validator;
use PDO;

class JadwalController extends Controller
{
    public function index(Request $request)
    {
        $startDate = Carbon::now()->startOfMonth(); // Tanggal 1 bulan ini
        $endDate = Carbon::now()->endOfMonth(); // Tanggal 30/31 bulan ini

        $query = Jadwal::query();
        $jadwal = $query->latest()->get();
        $count = [
            'jadwal_bulan_ini' => Jadwal::whereBetween('tanggal_foto', [$startDate, $endDate])->count(),
            'jadwal_selesai' => Jadwal::where('status', 'selesai')->count(),
            'jadwal_belum_selesai' => Jadwal::where('status', 'belum selesai')->count(),
            'dibatalkan' => Jadwal::where('status', 'di batalkan')->count(),
            'all' => Jadwal::count(),
        ];
        return inertia('Admin/Jadwal/Index', compact('jadwal', 'count'));
    }

    public function create(Request $req)
    {
        $query = DetailPesanan::with(['pesanan' => function ($q) {
            $q->with(['user' => function ($q) {
                $q->with('pelanggan');
            }]);
        }, 'paket'])->where('status_pesanan_paket', 'di terima')->whereHas('pesanan', function ($q) {
            $q->where('status_pembayaran', 'lunas');
        });
        $detail = $query->latest()->get();
        // dd($detail);

        return inertia('Admin/Jadwal/Form', compact('detail'));
    }

    public function store(Request $request)
    {
        $data = $request->input('data');
        foreach ($data as $item) {
            $validator = FacadesValidator::make($item, [
                'kd_pesanan' => 'required|string',
                'nama_paket' => 'required|string',
                'judul_jadwal' => 'nullable|string',
                'nama_pelanggan' => 'required|string',
                'kontak_pelanggan' => 'required|string',
                'lokasi' => 'required|string',
                'tanggal_foto' => 'required|date',
                'jam_foto' => 'required',
                'catatan' => 'nullable|string',
            ]);

            if ($validator->fails()) {

                return redirect()->back()->withErrors(['message' => 'mungkin terdapat isian yang kosong atau tidak benar silahkan mengisi kan jadwal dan lokasi']);
            }


            foreach ($data as $item) {

                $jadwal = Jadwal::create([
                    "kd_pesanan" => $item['kd_pesanan'],
                    "nama_paket" => $item['nama_paket'],
                    "judul_jadwal" => $item['judul_jadwal'],
                    "nam_pelanggan" => $item['nama_pelanggan'],
                    "kontak_pelanggan" => $item['kontak_pelanggan'],
                    "lokasi" => $item['lokasi'],
                    "tanggal_foto" => $item['tanggal_foto'],
                    "jam_foto" => $item['jam_foto'],
                ]);
            }
        }
    }

    public function delete(Request $request)
    {
        $jadwal = Jadwal::find($request->id);

        $jadwal->delete();

        return redirect()->back();
    }
}
