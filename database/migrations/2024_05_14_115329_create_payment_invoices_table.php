<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('order_id');
            $table->double('total_pembayaran');
            $table->string('status')->default(\App\Enums\InvoiceStatus::PENDING->value);
            $table->json('cart_ids');
            $table->json('payment_info')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('succeeded_at')->nullable();
            $table->string('snap_token')->unique()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_invoices');
    }
};
