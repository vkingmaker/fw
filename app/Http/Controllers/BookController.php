<?php

namespace App\Http\Controllers;

use App\Models\Comment;

class BookController extends Controller
{
    public function index()
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'https://anapioficeandfire.com/api/books/');
        $sorted = collect(json_decode($response->getBody()))->sortByDesc('released');
        $books = collect($sorted->values()->all())->map(function($book) {
           $comments_count = count(Comment::where('url', $book->url)->get());
           $book = collect($book);
           $book['comments_count'] = $comments_count;
           return $book;
        });

        return response()->json($books);
    }
}
