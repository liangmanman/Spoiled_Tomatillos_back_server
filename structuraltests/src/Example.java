public class Example {

    public String consolidateSpace (String inputText) {

        StringBuilder answer = new StringBuilder();

        boolean foundSpace = false;


        for (int i = 0; i < inputText.length(); i++)
        {
            if (inputText.charAt(i) == ' ') {
                foundSpace = true;
            }
            else {
                if (foundSpace) {
                    answer.append(' ');
                    foundSpace = false;
                }
                answer.append(inputText.charAt(i));
            }
        }
        return (answer.toString());
    }

    public static void main(String[] args){
        Example example = new Example();
        String givenString = "Hello there buddy";
        System.out.println("Input: " + givenString);
        String result = example.consolidateSpace(givenString);
        System.out.println("Output: " + result);
    }
}
