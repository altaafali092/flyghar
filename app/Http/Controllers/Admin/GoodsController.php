<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Goods\StoreGoodsRequest;
use App\Http\Requests\Goods\UpdateGoodsRequest;
use App\Http\Resources\GoodsResource;
use App\Models\Goods;
use App\Models\GoodsGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goods = Goods::latest()->paginate(10);
        return Inertia::render('others/ourGoods/Goods/Index', [
            'goods' => GoodsResource::collection($goods)->response()->getData(true) // Include meta and links
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $goodsGroups = GoodsGroup::where('is_active', 1)->get();
        return Inertia::render('others/ourGoods/Goods/Create', [
            'goodsGroups' => $goodsGroups,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGoodsRequest $request)
    {
        Goods::create($request->validated());
        return to_route('goods.index')->with('success', 'Goods created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Goods $good)
    {
        return Inertia::render('others/ourGoods/Goods/View', [
            'good' => $good,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Goods $good)
    {
        $goodsGroups = GoodsGroup::where('is_active', 1)->get();
        return Inertia::render('others/ourGoods/Goods/Edit', [
            'good' => $good,
            'goodsGroups' => $goodsGroups,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGoodsRequest $request, Goods $good)
    {
        $good->update($request->validated());
        return to_route('goods.index')->with('success', 'Goods updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goods $good)
    {
        $good->delete();
        return to_route('goods.index')->with('success', 'Goods deleted successfully');
    }
}
