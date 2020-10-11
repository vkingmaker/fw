<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'bookId' => 'required|integer',
            'body' => 'required|max:500',
        ]);

        $response = Comment::create([
            'bookId' => $request['bookId'],
            'body' => $request['body'],
            'userIp' => $request->ip()
        ]);

        return response()->json($response);
    }

    public function show(Request $request, $bookId)
    {
        $comments = Comment::where('bookId', $bookId)->orderByDesc('created_at')->get();

        return response()->json($comments);
    }
}
