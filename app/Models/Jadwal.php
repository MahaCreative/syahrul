<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function detail_pesanan()
    {
        return $this->belongsTo(DetailPesanan::class); //1 jadwal bisa memiliki 1 detail pesanan
    }
}
