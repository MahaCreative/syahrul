<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function detail_pesanan()
    {
        return $this->hasMany(DetailPesanan::class);
    }
}
