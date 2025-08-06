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
        Schema::create('opening_balances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sub_ledger_head_id')->constrained()->onDelete('cascade');
            $table->string('image')->nullable();
            $table->foreignId('fiscal_year_id')->constrained()->onDelete('cascade');
            $table->decimal('credit', 10, 2)->default(0);
            $table->decimal('debit', 10, 2)->default(0);
            $table->text('remark')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opening_balances');
    }
};
