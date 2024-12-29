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
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

export const EditSkillProfileForm = ({ profile }: { profile: RoleSkillData }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: profile.title || "",
      soc: profile.soc || "",
      function: profile.function || "",
      mappedTitle: profile.mappedTitle || "",
      occupation: profile.occupation || "",
      description: profile.description || "",
      roleTrack: profile.roleTrack || "Professional",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const updatedProfile: RoleSkillData = {
      ...profile,
      title: data.title,
      soc: data.soc,
      function: data.function,
      mappedTitle: data.mappedTitle,
      occupation: data.occupation,
      description: data.description,
      roleTrack: data.roleTrack,
      track: data.roleTrack || "Professional",
      specialized: profile.specialized.map(skill => ({
        ...skill,
        minimumLevel: 'beginner',
        requirementLevel: 'required',
        metrics: {
          growth: skill.growth,
          salary: skill.salary,
          skillScore: skill.skillScore || 0
        }
      })),
      common: profile.common.map(skill => ({
        ...skill,
        minimumLevel: 'beginner',
        requirementLevel: 'required',
        metrics: {
          growth: skill.growth,
          salary: skill.salary,
          skillScore: skill.skillScore || 0
        }
      })),
      certifications: profile.certifications.map(skill => ({
        ...skill,
        minimumLevel: 'beginner',
        requirementLevel: 'required',
        metrics: {
          growth: skill.growth,
          salary: skill.salary,
          skillScore: skill.skillScore || 0
        }
      })),
      skills: profile.skills.map(skill => ({
        ...skill,
        minimumLevel: 'beginner',
        requirementLevel: 'required',
        metrics: {
          growth: skill.growth,
          salary: skill.salary,
          skillScore: skill.skillScore || 0
        }
      }))
    };

    toast({
      title: "Profile updated",
      description: "Your skill profile has been updated successfully.",
    });

    navigate("/skills/profiles");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Role title" {...field} />
              </FormControl>
              <FormDescription>
                The title of the role or skill profile.
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
                <Input placeholder="SOC code" {...field} />
              </FormControl>
              <FormDescription>
                Standard Occupational Classification code.
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
                <Input placeholder="Function" {...field} />
              </FormControl>
              <FormDescription>
                The business function this role belongs to.
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
                <Input placeholder="Mapped title" {...field} />
              </FormControl>
              <FormDescription>
                Alternative or mapped title for this role.
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
                <Input placeholder="Occupation" {...field} />
              </FormControl>
              <FormDescription>
                The general occupation category.
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
                <Textarea
                  placeholder="Role description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of the role and its responsibilities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleTrack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Track</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a track" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Managerial">Managerial</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The career track for this role.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
};
