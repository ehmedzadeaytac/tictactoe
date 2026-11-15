import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Cell = "X" | "O" | null;

type Result = {
  winner: Cell;
  line: number[];
};

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (board: Cell[]): Result | null => {
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: line };
    }
  }
  return null;
};

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);

  const result = calculateWinner(board);
  const winner = result ? result.winner : null;
  const winLine = result ? result.line : [];
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handlePress = (index: number) => {
    if (board[index] !== null || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  let status = `Turn : ${isXTurn ? "X" : "O"}`;
  if (winner) {
    status = `Winner : ${winner} `;
  } else if (isDraw) {
    status = "Draw! ";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.status}>{status}</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cell, winLine.includes(index) && styles.winCell]}
            onPress={() => handlePress(index)}
          >
            <Text
              style={[styles.cellText, cell === "X" ? styles.x : styles.o]}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.restartBtn} onPress={restart}>
        <Text style={styles.restartText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  status: {
    fontSize: 22,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 24,
  },
  board: {
    width: 312,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: 96,
    height: 96,
    margin: 4,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  winCell: {
    backgroundColor: "#bbf7d0",
  },
  cellText: {
    fontSize: 52,
    fontWeight: "bold",
  },
  x: {
    color: "#3b82f6",
  },
  o: {
    color: "#ef4444",
  },
  restartBtn: {
    marginTop: 28,
    backgroundColor: "#1e293b",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  restartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});