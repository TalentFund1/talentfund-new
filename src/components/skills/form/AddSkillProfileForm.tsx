import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoleSkillData } from "../types/roleSkillTypes";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  soc: z.string().optional(),
  function: z.string().optional(),
  mappedTitle: z.string().optional(),
  occupation: z.string().optional(),
  description: z.string().optional(),
  roleTrack: z.enum(["Professional", "Managerial"]).optional(),
});

export const AddSkillProfileForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      soc: "",
      function: "",
      mappedTitle: "",
      occupation: "",
      description: "",
      roleTrack: "Professional",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const newProfile: RoleSkillData = {
      roleId: generateId(),
      title: data.title,
      soc: data.soc,
      function: data.function,
      mappedTitle: data.mappedTitle,
      occupation: data.occupation,
      description: data.description,
      roleTrack: data.roleTrack,
      track: data.roleTrack || "Professional",
      specialized: [],
      common: [],
      certifications: [],
      skills: []
    };

    toast({
      title: "Profile Created",
      description: `Successfully created profile: ${data.title}`,
    });

    console.log("New profile created:", newProfile);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter profile title" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the skill profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="soc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SOC Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter SOC code" {...field} />
              </FormControl>
              <FormDescription>
                Standard Occupational Classification code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="function"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Function</FormLabel>
              <FormControl>
                <Input placeholder="Enter function" {...field} />
              </FormControl>
              <FormDescription>
                The business function this role belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mappedTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mapped Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter mapped title" {...field} />
              </FormControl>
              <FormDescription>
                Alternative or mapped title for this role
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Enter occupation" {...field} />
              </FormControl>
              <FormDescription>
                The general occupation category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormDescription>
                Brief description of the role
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Profile</Button>
      </form>
    </Form>
  );
};