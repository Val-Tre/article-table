"use client";

import React from "react";
import GetArticle from "../components/article/getArticle";
import "../styles/globals.css";

export default function ArticlePage() {
    const articleId = "972d2b8a";
    return <GetArticle id={articleId} />;
}
