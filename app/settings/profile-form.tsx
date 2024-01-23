"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";

export default function ProfileForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [bio, setBio] = useState<string | "create a bio">("create a bio");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    setLoading(true);

    const { data } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", user?.id!)
      .single();

    if (data?.id) {
      setName(data.display_name);
      setUsername(data.username);
      setBio(data.bio!);
      setProfilePicture(data.profile_picture);
    }

    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    display_name,
    bio,
    profile_url,
  }: {
    username: string | null;
    display_name: string | null;
    bio: string | null;
    profile_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: Math.floor(Math.random() * 10000000) + 1,
        user: user?.id!,
        username: username,
        display_name: display_name!,
        bio: bio,
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div className="my-2">
        <Label className="text-md">Profile picture</Label>
      </div>
      <Avatar
        uid={user?.id!}
        url={profilePicture!}
        size={150}
        onUpload={(url: string) => {
          setProfilePicture(url);
          updateProfile({
            display_name: name,
            username,
            bio,
            profile_url: url,
          });
        }}
      />
      <div>
        <label htmlFor="fullName">Display name</label>
        <Input
          id="name"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Bio</label>
        <Textarea
          id="website"
          value={bio!}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div>
        <Button
          className="button primary block"
          onClick={() =>
            updateProfile({
              username,
              display_name: name,
              bio,
              profile_url: profilePicture,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
