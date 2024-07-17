"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreasuryDB } from "@/types/treasury";
import { AddTreasury } from "../forms/add-treasury";
import { TreasuryItem } from "../sections/treasury-item";
import { Button } from "../ui/button";

interface Props {
  games: TreasuryDB[];
  pubkey: string;
  privateGames: TreasuryDB[];
}

export function GamePage({ games, pubkey, privateGames }: Props) {
  return (
    <Tabs defaultValue="games" className="flex flex-col">
      <TabsList className="mx-auto mb-4">
        <TabsTrigger value="games">Listed Games</TabsTrigger>
        <TabsTrigger value="private">My Games</TabsTrigger>
      </TabsList>
      <TabsContent value="games">
        {games.length === 0 && (
          <p className="text-center text-muted-foreground">
            -- No games available --
          </p>
        )}
        {games.map((game) => (
          <TreasuryItem treasury={game} pubkey={pubkey} />
        ))}
      </TabsContent>
      <TabsContent value="private" className="flex flex-col gap-4 items-center">
        {privateGames?.length === 0 && (
          <p className="text-center text-muted-foreground">
            -- No games available --
          </p>
        )}
        {privateGames?.map((game) => (
          <TreasuryItem treasury={game} pubkey={pubkey} />
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add a Game</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add your game token here</DialogTitle>
              <AddTreasury />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TabsContent>
    </Tabs>
  );
}
