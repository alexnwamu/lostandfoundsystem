"use client";
import Image from "next/image";
import React, { useState } from "react";
import { contactus } from "@/../assets";
import "../globals.css";
import { toast } from "@/components/ui/use-toast";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
interface FormData {
  name: string;
  itemTag: string;
  subject: string;
  message: string;
}
const ContactUsPage = () => {
  let tag: any = "";
    let params: any = '';
    params = useSearchParams();
  if (typeof window !== "undefined") {
    // browser code

    const query = new URLSearchParams(window.location.search);

    tag = query.get("tag");
  }
    tag = params.get("tag");
  const { data: session } = useSession();

  const [formData, setFormData] = useState<FormData>({
    name: session?.user?.name || "",
    itemTag: tag || "Tag (You cant edit this its only for claiming items)",
    subject: tag ? "Claim Item" : "",
    message: tag ? "I want to Claim this Item" : "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast({
        title: "Message sent",
      });
      setFormData({
        name: "",
        itemTag: "Tag (You cant edit this its only for claiming items)",
        subject: "",
        message: "",
      });
    } else {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Suspense>
      <main className="w-full text-[#615C61] mb-[120px] flex flex-col text-center">
        <h1 className="text-[32px] mt-[199px] mb-[32px]"> Contact us Today </h1>
        <p className="mb-[115px]">
          Do you have specific things to tell us? Contact us below
        </p>
        <div className="mx-auto flex gap-8">
          <div className="relative w-[599px] h-[599px] ">
            <Image src={contactus} fill={true} alt="contactus" />
          </div>
          <form className="max-w-[611px]" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              className="w-full mb-[30px] h-[70px] pl-[25.9px] py-[8.65px] pr-[8.65px] border border-solid rounded-[15px] border-[#DCDCDC] placeholder:text-[15px] placeholder:text-[#5B5B5B]"
              placeholder="Name *"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              required
              type="text"
              className="w-full h-[70px] mb-[30px] pl-[25.9px] py-[8.65px] pr-[8.65px] border border-solid rounded-[15px] border-[#DCDCDC] placeholder:text-[15px] placeholder:text-[#5B5B5B]"
              placeholder="Item Tag *"
              value={formData?.itemTag}
            />
            <input
              required
              type="text"
              className="w-full h-[70px] mb-[30px] pl-[25.9px] py-[8.65px] pr-[8.65px] border border-solid rounded-[15px] border-[#DCDCDC] placeholder:text-[15px] placeholder:text-[#5B5B5B]"
              placeholder="Subject *"
              value={formData?.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
            <textarea
              className="w-full h-[206px] mb-[20px] pl-[25.9px] py-[8.65px] pr-[8.65px] border border-solid rounded-[15px] border-[#DCDCDC] placeholder:text-[15px] placeholder:text-[#5B5B5B]"
              placeholder="Message *"
              value={formData?.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <button className="reportbutton h-[69px] text-white w-full ">
              Submit
            </button>
          </form>
        </div>
      </main>
    </Suspense>
  );
};

export default ContactUsPage;
