import React from 'react';
import { Button } from "@/components/ui/button";

export const CompensationSegment = () => {
  return (
    <div className="mt-8 border rounded-lg p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Compensation Analysis</h3>
        <Button variant="default">Add Skill Profile</Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold flex items-center gap-2">
            Artificial Engineer
            <span className="text-sm font-normal text-muted-foreground">
              SOC: (11-9041)
            </span>
          </h4>
          <p className="text-muted-foreground">New York, NYC</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-medium">Function</p>
            <p className="text-muted-foreground">Technology</p>
          </div>
          <div>
            <p className="font-medium">Occupation</p>
            <p className="text-muted-foreground">Software Developer</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="font-medium">Matching Profiles</span>
            </div>
            <p className="text-2xl font-bold">8,745</p>
            <p className="text-sm text-muted-foreground">Regional diversity: 58%</p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <path d="M4 22v-7" />
              </svg>
              <span className="font-medium">Median Advertised Salary</span>
            </div>
            <p className="text-2xl font-bold">$140,456</p>
            <p className="text-sm text-muted-foreground">749 salary observations</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Job Description</h4>
          <p className="text-muted-foreground">
            AI engineer engineer will join a multidisciplinary team helping to shape our AI strategy and showcasing the potential for AI through early-stage solutions. This is an excellent opportunity to take advantage of emerging trends and technologies and make a real-world difference.
          </p>
          <button className="text-primary mt-2">See more</button>
        </div>
      </div>
    </div>
  );
};