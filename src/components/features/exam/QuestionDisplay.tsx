import { Question } from '@/types';
// import { useExamStore } from '@/store/examStore'; // Import if needed for answering later

interface QuestionDisplayProps {
  question: Question;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
   // TODO (Day 6): Get userAnswers and answerQuestion action from useExamStore
   // const { userAnswers, answerQuestion } = useExamStore();
   // const currentAnswer = userAnswers[question.$id];

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedIndex = parseInt(event.target.value, 10);
      console.log(`Selected option ${selectedIndex} for question ${question.$id}`);
      // TODO (Day 6): Call answerQuestion(question.$id, selectedIndex);
  };

  return (
    <div className="prose max-w-none"> {/* Basic prose styling for text */}
        {/* Question Text - Use dangerouslySetInnerHTML ONLY if text contains trusted HTML */}
        {/* Otherwise, render as plain text or use a Markdown renderer */}
        <p className="text-lg font-medium mb-4">{question.text}</p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
              // TODO (Day 6): Add styling for selected answer: e.g., ${currentAnswer === index ? 'bg-blue-100 border-blue-300' : 'border-gray-300'}
            >
              <input
                type="radio"
                name={`question-${question.$id}`} // Group radios for the same question
                value={index} // The value submitted will be the option index
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                onChange={handleOptionChange} // Add onChange handler
                // TODO (Day 6): Set checked status: checked={currentAnswer === index}
              />
              <span className="text-base">{option}</span>
            </label>
          ))}
        </div>
    </div>
  );
}