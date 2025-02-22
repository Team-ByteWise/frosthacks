"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";

interface FormValues {
  feedback: string;
}

export function FormDemo() {
  const { username, authToken } = useUser();
  const form = useForm<FormValues>({
    defaultValues: {
      feedback: "",
    },
  });

  function onSubmit(data: FormValues) {
    axios.post(`${BASE_URL}/qna/post`, {
      question: data.feedback,
    }, {headers: {
      Authorization: `Bearer ${authToken}`
    }});
    
    toast.success("Form submitted!", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    
    form.reset();
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="message-2">Your Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." id="message-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}