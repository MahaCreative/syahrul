<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stat_pembayaran_pesanan = $this->stat_pembayaran_pesanan();
        $topPackages = DetailPesanan::join('pakets', 'detail_pesanans.paket_id', '=', 'pakets.id')
            ->select('pakets.nama_paket', DB::raw('count(detail_pesanans.paket_id) as total'))
            ->groupBy('pakets.nama_paket')
            ->orderByDesc('total')
            ->take(10)
            ->get();
        $count = [
            'jumlah_pelanggan' => Pelanggan::count(),
            'jumlah_pesanan' => Pesanan::count(),
            'jumlah_team' => Team::count(),
            'total_uang' => Pesanan::where('status_pembayaran', 'lunas')->sum('total_pembayaran')
        ];
        $query = DetailPesanan::query()->with('pesanan', 'paket');
        $detail = $query->latest()->get();
        return inertia('Admin/Dashboard/Index', compact('stat_pembayaran_pesanan', 'topPackages', 'count', 'detail'));
    }

    public function stat_pembayaran_pesanan()
    {
        $monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        $statuses = ['belum lunas', 'lunas', 'pending'];
        $monthlyData = [];

        // Inisialisasi data bulanan untuk setiap status
        foreach ($statuses as $status) {
            $monthlyData[$status] = [];

            // Inisialisasi data bulanan dengan nilai 0 untuk setiap status
            foreach ($monthNames as $month) {
                $monthlyData[$status][$month] = 0;
            }
        }

        // Mengisi data bulanan untuk setiap status
        foreach ($statuses as $status) {
            $data = Pesanan::select(DB::raw('MONTH(created_at) as month'), DB::raw('SUM(total_pembayaran) as total'))
                ->whereYear('created_at', 2024)
                ->where('status_pembayaran', $status)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->orderBy(DB::raw('MONTH(created_at)'))
                ->get();

            // Mengisi data bulanan yang ada
            foreach ($data as $item) {
                $month = $monthNames[$item->month - 1];
                $monthlyData[$status][$month] = $item->total;
            }
        }

        return $monthlyData;
    }
}
