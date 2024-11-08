import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from '@/components/Sidebar';

const MarketData = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [anySkills, setAnySkills] = useState('');
  const [allSkills, setAllSkills] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [openJobTitle, setOpenJobTitle] = useState(false);
  const [openAnySkills, setOpenAnySkills] = useState(false);
  const [openAllSkills, setOpenAllSkills] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Market Data</h2>
            
            <div className="space-y-4">
              <h3 className="font-medium">Search</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm mb-2 block">Job Title</label>
                  <div className="relative">
                    <Input
                      value={jobTitle}
                      onClick={() => setOpenJobTitle(true)}
                      readOnly
                      placeholder="Artificial Engineer"
                      className="bg-white"
                    />
                    <CommandDialog open={openJobTitle} onOpenChange={setOpenJobTitle}>
                      <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Search job titles..." />
                        <CommandList>
                          <CommandEmpty>No job titles found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem onSelect={(value) => {
                              setJobTitle(value);
                              setOpenJobTitle(false);
                            }}>
                              Software Engineer
                            </CommandItem>
                            <CommandItem onSelect={(value) => {
                              setJobTitle(value);
                              setOpenJobTitle(false);
                            }}>
                              Data Scientist
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </CommandDialog>
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Has ANY of the following skills</label>
                  <div className="relative">
                    <Input
                      value={anySkills}
                      onClick={() => setOpenAnySkills(true)}
                      readOnly
                      placeholder="NLP"
                      className="bg-white"
                    />
                    <CommandDialog open={openAnySkills} onOpenChange={setOpenAnySkills}>
                      <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Search skills..." />
                        <CommandList>
                          <CommandEmpty>No skills found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem onSelect={(value) => {
                              setAnySkills(value);
                              setOpenAnySkills(false);
                            }}>
                              NLP
                            </CommandItem>
                            <CommandItem onSelect={(value) => {
                              setAnySkills(value);
                              setOpenAnySkills(false);
                            }}>
                              Machine Learning
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </CommandDialog>
                  </div>
                </div>

                <div className="text-center">- AND -</div>

                <div>
                  <label className="text-sm mb-2 block">Has ALL of the following skills</label>
                  <div className="relative">
                    <Input
                      value={allSkills}
                      onClick={() => setOpenAllSkills(true)}
                      readOnly
                      placeholder="Python"
                      className="bg-white"
                    />
                    <CommandDialog open={openAllSkills} onOpenChange={setOpenAllSkills}>
                      <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Search skills..." />
                        <CommandList>
                          <CommandEmpty>No skills found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem onSelect={(value) => {
                              setAllSkills(value);
                              setOpenAllSkills(false);
                            }}>
                              Python
                            </CommandItem>
                            <CommandItem onSelect={(value) => {
                              setAllSkills(value);
                              setOpenAllSkills(false);
                            }}>
                              JavaScript
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </CommandDialog>
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Company</label>
                  <div className="relative">
                    <Input
                      value={company}
                      onClick={() => setOpenCompany(true)}
                      readOnly
                      className="bg-white"
                    />
                    <CommandDialog open={openCompany} onOpenChange={setOpenCompany}>
                      <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Search companies..." />
                        <CommandList>
                          <CommandEmpty>No companies found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem onSelect={(value) => {
                              setCompany(value);
                              setOpenCompany(false);
                            }}>
                              Google
                            </CommandItem>
                            <CommandItem onSelect={(value) => {
                              setCompany(value);
                              setOpenCompany(false);
                            }}>
                              Microsoft
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </CommandDialog>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm mb-2 block">Location</label>
                    <div className="relative">
                      <Input
                        value={location}
                        onClick={() => setOpenLocation(true)}
                        readOnly
                        placeholder="New York, NYC"
                        className="bg-white"
                      />
                      <CommandDialog open={openLocation} onOpenChange={setOpenLocation}>
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput placeholder="Search locations..." />
                          <CommandList>
                            <CommandEmpty>No locations found.</CommandEmpty>
                            <CommandGroup>
                              <CommandItem onSelect={(value) => {
                                setLocation(value);
                                setOpenLocation(false);
                              }}>
                                New York, NYC
                              </CommandItem>
                              <CommandItem onSelect={(value) => {
                                setLocation(value);
                                setOpenLocation(false);
                              }}>
                                San Francisco, CA
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </CommandDialog>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm block">Select Timeframe</label>
                    <div className="flex gap-2">
                      <Select defaultValue="may2023">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="may2023">May 2023</SelectItem>
                          <SelectItem value="jun2023">Jun 2023</SelectItem>
                          <SelectItem value="jul2023">Jul 2023</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="may2024">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="may2024">May 2024</SelectItem>
                          <SelectItem value="jun2024">Jun 2024</SelectItem>
                          <SelectItem value="jul2024">Jul 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Clear All</Button>
                  <Button>Run</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;