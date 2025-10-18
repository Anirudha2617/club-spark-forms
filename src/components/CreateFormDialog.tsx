import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, X } from 'lucide-react';

interface FormQuestion {
  type: 'short_text' | 'long_text' | 'multiple_choice';
  question: string;
  options?: string[];
  required: boolean;
}

interface CreateFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateForm: (formData: { title: string; description: string; questions: FormQuestion[] }) => void;
}

export const CreateFormDialog = ({ open, onOpenChange, onCreateForm }: CreateFormDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<FormQuestion[]>([
    { type: 'short_text', question: '', required: true }
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: 'short_text', question: '', required: false }]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index: number, field: keyof FormQuestion, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    const validQuestions = questions.filter(q => q.question.trim());
    if (title.trim() && validQuestions.length > 0) {
      onCreateForm({ title, description, questions: validQuestions });
      setTitle('');
      setDescription('');
      setQuestions([{ type: 'short_text', question: '', required: true }]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-elevated border-border/50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Create Form
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Form Title</label>
            <Input
              type="text"
              placeholder="Give your form a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="What's this form for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass min-h-[60px]"
            />
          </div>

          <div className="space-y-4 pt-4">
            <label className="text-sm font-medium">Questions</label>
            {questions.map((question, index) => (
              <div key={index} className="glass p-4 rounded-lg space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="flex-1 space-y-3">
                    <Input
                      type="text"
                      placeholder="Question text"
                      value={question.question}
                      onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                      className="glass"
                    />

                    <Select
                      value={question.type}
                      onValueChange={(value) => handleQuestionChange(index, 'type', value)}
                    >
                      <SelectTrigger className="glass">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-elevated">
                        <SelectItem value="short_text">Short Text</SelectItem>
                        <SelectItem value="long_text">Long Text</SelectItem>
                        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                      </SelectContent>
                    </Select>

                    {question.type === 'multiple_choice' && (
                      <Input
                        type="text"
                        placeholder="Options (comma separated)"
                        className="glass"
                      />
                    )}
                  </div>

                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveQuestion(index)}
                      className="rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAddQuestion}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || questions.filter(q => q.question.trim()).length === 0}
              className="glow-primary"
            >
              Create Form
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
