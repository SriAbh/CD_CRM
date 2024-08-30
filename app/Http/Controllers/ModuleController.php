<?php

namespace App\Http\Controllers;


use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ModuleController extends Controller
{

    public function showDynamicForm()
    {
        return view('sections.section');
    }
    // Creating a new module
    public function createModule(Request $request)
    {

        $rules = [
            'name' => ['required', 'string', 'max:30', 'unique:modules,name'],
            'email' => ['required', 'string', 'email', 'max:50'],
            'owner' => ['required', 'string'],
            'createdBy' => ['required', 'string'],
            'other' => ['required', 'string'],
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        try {
            $existingModule = Module::where('name', $request->name)->first();
            if ($existingModule) {
                return response()->json([
                    'message' => 'Module already exists.'
                ], 400);
            }

            $module = Module::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'owner' => $request->input('owner'),
                'created_by' => $request->input('createdBy'),
                'other' => $request->input('other'),
            ]);


            return response()->json([
                'success' => true,
                'message' => 'Module has been created successfully',
                'Module' => $module
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // Fetching details of an existing module
    public function moduledata(Request $request)
    {
        try {
            $moduledetails = DB::select('select * from modules');

            if ($moduledetails) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data retrieved successfully',
                    'details' => $moduledetails
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Module not found'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // Creating a view for different module
    // public function showModule($name)
    // {
    //     $module = Module::where('name', $name);
    //     // dd($module);

    //     if (!$module) {
    //         abort(404);
    //     }
    //     // dd($module);

    //     return view('module.modules', ['module' => $module]);
    // }
}
