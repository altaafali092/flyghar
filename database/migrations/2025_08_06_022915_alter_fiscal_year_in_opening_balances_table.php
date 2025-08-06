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
    Schema::table('opening_balances', function (Blueprint $table) {
        $table->dropConstrainedForeignId('fiscal_year_id'); // drop old FK
        $table->string('fiscal_year')->nullable()->after('image');
    });
}

public function down(): void
{
    Schema::table('opening_balances', function (Blueprint $table) {
        $table->dropColumn('fiscal_year');
        $table->foreignId('fiscal_year_id')->constrained()->onDelete('cascade');
    });
}
};
