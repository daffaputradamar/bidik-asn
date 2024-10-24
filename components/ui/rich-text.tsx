'use client';
import { useEffect } from 'react';
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Editor as EditorTipTap } from "@tiptap/react"
import { Toggle } from "@/components/ui/toggle"
import {
    ToggleGroup as ToggleGroupPrimitive,
    Toolbar as ToolbarPrimitive,
  } from "@radix-ui/react-toolbar"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { ArrowUUpLeft, ArrowUUpRight, Code, ListBullets, ListNumbers, Minus, Quotes, TextB, TextItalic, TextStrikethrough } from '@phosphor-icons/react';

interface FormatTypeProps {
    editor: EditorTipTap
}

function FormatType({ editor }: FormatTypeProps) {
    const value = () => {
        if (editor.isActive("paragraph")) return "paragraph"
        if (editor.isActive("heading", { level: 1 })) return "h1"
        if (editor.isActive("heading", { level: 2 })) return "h2"
        if (editor.isActive("heading", { level: 3 })) return "h3"
        if (editor.isActive("heading", { level: 4 })) return "h4"
        if (editor.isActive("heading", { level: 5 })) return "h5"
        if (editor.isActive("heading", { level: 6 })) return "h6"
    }

    const onChange = (value: string) => {
        switch (value) {
            case "paragraph":
                editor.chain().focus().setParagraph().run()
                break
            case "h1":
                editor.chain().focus().toggleHeading({ level: 1 }).run()
                break
            case "h2":
                editor.chain().focus().toggleHeading({ level: 2 }).run()
                break
            case "h3":
                editor.chain().focus().toggleHeading({ level: 3 }).run()
                break
            case "h4":
                editor.chain().focus().toggleHeading({ level: 4 }).run()
                break
            case "h5":
                editor.chain().focus().toggleHeading({ level: 5 }).run()
                break
            case "h6":
                editor.chain().focus().toggleHeading({ level: 6 }).run()
                break
        }
    }

    return (
        <Select onValueChange={onChange} defaultValue={value()} value={value()}>
            <SelectTrigger className="h-8 w-[120px] invisible sm:visible">
                <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="h1">H1</SelectItem>
                    <SelectItem value="h2">H2</SelectItem>
                    <SelectItem value="h3">H3</SelectItem>
                    <SelectItem value="h4">H4</SelectItem>
                    <SelectItem value="h5">H5</SelectItem>
                    <SelectItem value="h6">H6</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}



interface ToolbarProps {
    children: React.ReactNode
    className?: string
}

const Toolbar = ({ children, className }: ToolbarProps) => {
    return (
        <ToolbarPrimitive
            className={cn(
                "sticky inset-x-0 top-0 z-50 my-2 rounded-sm bg-secondary/40 px-4 py-2 backdrop-blur-lg",
                className
            )}>
            {children}
        </ToolbarPrimitive>
    )
}

const ToggleGroup = ToggleGroupPrimitive

ToggleGroup.displayName = ToggleGroupPrimitive.displayName



interface EditorProps {
    content: string
    placeholder?: string
    onChange: (value: string) => void
}

interface EditorToolbarProps {
    editor: EditorTipTap
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
    return (
        <Toolbar className="m-0 flex items-center justify-between p-2" aria-label="Formatting options">
            <ToggleGroup className="flex flex-row items-center" type="multiple">
                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    pressed={editor.isActive("bold")}>
                    <TextB />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    pressed={editor.isActive("italic")}
                    value="italic">
                    <TextItalic />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    pressed={editor.isActive("strike")}>
                    <TextStrikethrough />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    pressed={editor.isActive("bulletList")}>
                    <ListBullets />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    pressed={editor.isActive("orderedList")}>
                    <ListNumbers />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                    pressed={editor.isActive("codeBlock")}>
                    <Code />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                    pressed={editor.isActive("blockquote")}>
                    <Quotes />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
                    <Minus />
                </Toggle>

                <FormatType editor={editor} />
            </ToggleGroup>

            <ToggleGroup className="flex flex-row items-center invisible sm:visible" type="multiple">
                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}>
                    <ArrowUUpLeft />
                </Toggle>

                <Toggle
                    size="sm"
                    className="mr-1"
                    onPressedChange={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}>
                    <ArrowUUpRight />
                </Toggle>
            </ToggleGroup>
        </Toolbar>
    )
}


const Editor = ({ content, placeholder, onChange }: EditorProps) => {

    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content); // Set the content after editor is initialized
        }
    }, [editor, content]); // Re-run when editor or content changes

    if (!editor) return <></>

    return (
        <div className="prose max-w-none w-full border border-input bg-background dark:prose-invert">
            <EditorToolbar editor={editor} />
            <div className="editor min-h-72">
                <EditorContent editor={editor} placeholder={placeholder} />
            </div>
        </div>
    )
}

interface RictTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const RictTextEditor = ({ value, onChange, placeholder }: RictTextEditorProps) => {

    return (
        <Editor
            content={value}
            placeholder={placeholder ?? 'Description...'}
            onChange={onChange}
        />
    );
};

export default RictTextEditor;