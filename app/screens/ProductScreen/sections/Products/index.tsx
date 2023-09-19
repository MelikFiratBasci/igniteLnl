/* eslint-disable react/jsx-key */
import React, { useState } from "react"
import { Demo } from "../../ProductScreen"
import { DemoUseCase } from "./../../DemoUseCase"
import Product from "./Product"

export const Index: Demo = {

  name: "Products & Services",
  description: null,
  data: [
    <DemoUseCase
      name="Products"
    >
      <Product />

    </DemoUseCase>,

    <DemoUseCase
      name="Services"
      description="Depending on what's required, the card comes preconfigured with different alignment strategies."
    >

    </DemoUseCase>,


  ],
}

export default Index

// @demo remove-file
