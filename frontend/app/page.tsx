"use client";

import React, { useEffect, useState } from "react";
import Banner from "./components/Banner/index";
import Companies from "./components/Companies/Companies";
import Courses from "./components/Courses/index";
import Mentor from "./components/Mentor/index";
import Testimonials from "./components/Testimonials/index";
import Newsletter from "./components/Newsletter/Newsletter";

export default function Home() {
  return (
    <div>
      <Banner />
      <Companies />
      <Testimonials />
      <Courses />
      <Mentor />
    </div>
  );
}
