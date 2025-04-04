"use client"
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, Stack, Typography } from "@mui/material"

const difficultyOptions = [
  {
    id: "A",
    label: "東京旅行",
    // description: "Larger radius, more forgiving scoring",
    color: "#4caf50", // green
  },
  {
    id: "B",
    label: "日本一周",
    // description: "Balanced difficulty",
    color: "#ff9800", // orange
  },
  {
    id: "C",
    label: "世界一周",
    // description: "Small radius, precise scoring",
    color: "#f44336", // red
  },
]

export default function FirstDialog({ open, onSelectDifficulty }) {
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          px: 2,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pt: 4 }}>
        <Typography variant="h4" component="div" fontWeight="bold">
          モード選択
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", mb: 3 }}>
          ARグラスで見たい景色を選んでね
        </DialogContentText>

        <Stack spacing={2} sx={{ mb: 4 }}>
          {difficultyOptions.map((option) => (
            <Button
              key={option.id}
              variant="contained"
              size="large"
              onClick={() => onSelectDifficulty(option.id)}
              sx={{
                py: 2,
                backgroundColor: option.color,
                "&:hover": {
                  backgroundColor: option.color,
                  opacity: 0.9,
                },
              }}
            >
              <Stack direction="column" spacing={0.5}>
                <Typography variant="h6">{option.label}</Typography>
                <Typography variant="body2">{option.description}</Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

