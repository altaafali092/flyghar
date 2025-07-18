<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GoodsGroup\StoreGoodsGroupRequest;
use App\Http\Requests\GoodsGroup\UpdateGoodsGroupRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Models\GoodsGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoodsGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goodsGroups = GoodsGroup::latest()->paginate(10);
        return Inertia::render('others/ourGoods/GoodsGroup/Index',[
            'goodsGroups' => $goodsGroups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('others/ourGoods/GoodsGroup/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGoodsGroupRequest $request)
    {
        GoodsGroup::create($request->validated());
        return to_route('goods-group.index')->with('success','Goods group created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(GoodsGroup $goodsGroup)

    {

      
        return Inertia::render('others/ourGoods/GoodsGroup/View',[
            'goodsGroup' => $goodsGroup,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GoodsGroup $goodsGroup)
    {
        return Inertia::render('others/ourGoods/GoodsGroup/Edit',[
            'goodsGroup' => $goodsGroup,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGoodsGroupRequest $request, GoodsGroup $goodsGroup)
    {
        $goodsGroup->update($request->validated());
        return to_route('goods-group.index')->with('success','Goods group updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GoodsGroup $goodsGroup)
    {
        $goodsGroup->delete();
        return to_route('goods-group.index')->with('success','Goods group deleted successfully');
    }

     public function updateStatus(GoodsGroup $goodsGroup)
    {
        $goodsGroup->update([
            'is_active' => !$goodsGroup->is_active
        ]);
        return back()->with('success','Status updated successfully');
    }
}
