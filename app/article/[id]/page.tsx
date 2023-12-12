"use client";

import React from "react";
import GetArticle from "../../components/article/getArticle";
import "../../styles/globals.css";

export default function ArticlePage({ params }: { params: { id: string } }) {
    return <GetArticle id={params.id} />;
}
