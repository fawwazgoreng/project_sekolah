<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //
    public function index()
    {
        $user = User::paginate();

        return response()->json([
            'status' => 1,
            'message' => 'User fetched',
            'data' => $user
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Validation error',
                'data' => $validator->errors()->all()
            ]);
        }
        
        $User = User::create([
            "name"=>$request->name,
            "username"=>$request->username,
            "password"=>bcrypt($request->password)
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'User created',
            'data' => $User
        ]);
    }
   
    public function show(Request $request, string $id)
    {
        $User = User::find($id);

        return response()->json([
            'status' => 1,
            'message' => 'User return',
            'data' => $User
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Validation error',
                'data' => $validator->errors()->all()
            ]);
        }

        $User = User::find($id);
        $User ->name = $request->name;
        $User ->username = $request->username;
        $User ->password = $request->password;
        $User->save();

        return response()->json([
            'status' => 1,
            'message' => 'User Updated',
            'data' => $User
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $User = User::find($id);
        $User->delete();
        return response()->json([
            'status' => 1,
            'message' => 'User Deleted',
            'data' => null
        ]);
    }
}

